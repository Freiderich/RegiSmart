export interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
  resultIndex: number
}

export interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

export class VoiceAssistant {
  private recognition: any
  private synthesis: SpeechSynthesis | null = null
  private onResultCallback?: (transcript: string) => void
  private onErrorCallback?: (error: string) => void

  constructor() {
    if (typeof window !== "undefined") {
      this.synthesis = window.speechSynthesis
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition

      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition()
        this.recognition.continuous = true
        this.recognition.interimResults = true
        this.recognition.lang = "en-US"

        this.recognition.onresult = (event: SpeechRecognitionEvent) => {
          const current = event.resultIndex
          const transcript = event.results[current][0].transcript

          if (event.results[current].isFinal && this.onResultCallback) {
            this.onResultCallback(transcript)
          }
        }

        this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          if (this.onErrorCallback) {
            this.onErrorCallback(event.error)
          }
        }
      }
    }
  }

  speak(text: string, options?: { rate?: number; pitch?: number; volume?: number }) {
    if (!this.synthesis) return

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = options?.rate || 0.9
    utterance.pitch = options?.pitch || 1
    utterance.volume = options?.volume || 1

    this.synthesis.speak(utterance)
  }

  startListening() {
    if (this.recognition) {
      this.recognition.start()
    }
  }

  stopListening() {
    if (this.recognition) {
      this.recognition.stop()
    }
  }

  onResult(callback: (transcript: string) => void) {
    this.onResultCallback = callback
  }

  onError(callback: (error: string) => void) {
    this.onErrorCallback = callback
  }

  cancel() {
    if (this.synthesis) {
      this.synthesis.cancel()
    }
    if (this.recognition) {
      this.recognition.stop()
    }
  }
}
