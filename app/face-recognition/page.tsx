'use client';

import React, { useRef, useState, useEffect } from 'react';
import { detectFaceInImage, recognizeFace, loadModels } from '@/lib/facial-recognition-pretrained';
import { setCameraDirection } from '@/lib/camera-depth';

declare global {
  interface Window {
    faceapi: any;
  }
}

export default function FaceRecognitionPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [cameraDirection, setCameraDir] = useState<'left' | 'right' | 'center'>('center');
  const [isProcessing, setIsProcessing] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);

  useEffect(() => {
    // Load face-api.js script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js';
    script.async = true;
    script.onload = async () => {
      // Load TensorFlow.js
      const tfScript = document.createElement('script');
      tfScript.src = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.20.0/dist/tf.min.js';
      tfScript.async = true;
      tfScript.onload = async () => {
        // Load backend
        const backendScript = document.createElement('script');
        backendScript.src = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl@4.20.0/dist/tf-backend-webgl.min.js';
        backendScript.async = true;
        backendScript.onload = () => {
          loadModels();
        };
        document.body.appendChild(backendScript);
      };
      document.body.appendChild(tfScript);
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsStreaming(true);
        }
      } catch (error) {
        console.error('Camera access denied:', error);
        alert('Please allow camera access to use face recognition.');
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const captureAndRecognize = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsProcessing(true);
    try {
      const context = canvasRef.current.getContext('2d');
      if (!context) return;

      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);

      // Recognize face using face-api.js with 3D depth verification
      if (window.faceapi) {
        const recognition = await recognizeFace(canvasRef.current);
        if (recognition.verified) {
          setFaceDetected(true);
          setResult(`${recognition.message}`);
        } else {
          setFaceDetected(false);
          setResult(recognition.message);
        }
      }
    } catch (error) {
      console.error('Recognition error:', error);
      setResult('Error during face recognition. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = async () => {
        try {
          if (window.faceapi) {
            const recognition = await recognizeFace(img);
            if (recognition.verified) {
              setFaceDetected(true);
              setResult(`${recognition.message}`);
            } else {
              setFaceDetected(false);
              setResult(recognition.message);
            }
          } else {
            setResult('Face detection model not loaded. Please try again.');
          }
        } catch (error) {
          console.error('Upload recognition error:', error);
          setResult('Error during face recognition.');
        } finally {
          setIsProcessing(false);
        }
      };
    };
    reader.readAsDataURL(file);
  };

  const handleCameraDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const direction = e.target.value as 'left' | 'right' | 'center';
    setCameraDir(direction);
    setCameraDirection(direction);
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20, border: '1px solid #eee', borderRadius: 8 }}>
      <h2>Face Recognition System</h2>

      {/* Camera Direction Settings */}
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="camera-direction">Camera Direction:</label>
        <select
          id="camera-direction"
          value={cameraDirection}
          onChange={handleCameraDirectionChange}
          style={{ marginLeft: 8, padding: 6 }}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>

      {/* Camera Feed */}
      <div style={{ marginBottom: 16, textAlign: 'center' }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: '100%',
            maxWidth: 400,
            borderRadius: 8,
            border: faceDetected ? '3px solid green' : '2px solid #ccc',
            transform: cameraDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
          }}
        />
      </div>

      {/* Hidden Canvas for Capture */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Capture Button */}
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <button
          onClick={captureAndRecognize}
          disabled={isProcessing}
          style={{
            padding: '10px 20px',
            backgroundColor: isProcessing ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: isProcessing ? 'not-allowed' : 'pointer',
            marginRight: 8,
          }}
        >
          {isProcessing ? 'Processing...' : 'Capture & Recognize'}
        </button>
      </div>

      {/* File Upload */}
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="file-input">Or upload an image:</label>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          disabled={isProcessing}
          style={{ marginLeft: 8 }}
        />
      </div>

      {/* Result */}
      {result && (
        <div style={{ marginTop: 24, padding: 12, backgroundColor: result.includes('Verified') ? '#d4edda' : '#f8d7da', borderRadius: 4 }}>
          <strong>Recognition Result:</strong>
          <p style={{ marginTop: 8, fontSize: 16, color: result.includes('Verified') || result.includes('Verified') ? 'green' : 'red' }}>
            {result}
          </p>
        </div>
      )}

      {/* Face Detection Status */}
      <div style={{ marginTop: 24, padding: 12, backgroundColor: '#e7f3ff', borderRadius: 4 }}>
        <p style={{ fontSize: 12 }}>
          <strong>Camera Status:</strong> {isStreaming ? '✓ Active' : '✗ Inactive'}
        </p>
        <p style={{ fontSize: 12 }}>
          <strong>Face Detected:</strong> {faceDetected ? '✓ Yes' : '✗ No'}
        </p>
      </div>
    </div>
  );
}
