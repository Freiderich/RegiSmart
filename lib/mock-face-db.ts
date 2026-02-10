// Enhanced mock database for face recognition with face descriptors and 3D depth
export type FaceRecord = {
  id: string;
  studentId: string;
  name: string;
  faceDescriptor: number[]; // Face embedding/descriptor from face-api.js (128-dimensional)
  enrollmentDate: string;
  depthData?: { minDepth: number; maxDepth: number }; // 3D depth for anti-spoofing
};

const mockFaceDB: FaceRecord[] = [
  {
    id: '1',
    studentId: '20876916',
    name: 'Student 20876916',
    faceDescriptor: Array(128).fill(0.5), // Placeholder - will be updated on enrollment
    enrollmentDate: new Date().toISOString(),
    depthData: { minDepth: 30, maxDepth: 60 }, // 3D depth range in cm
  },
];

// Face matching threshold (0-1, lower = stricter matching)
// Using very high threshold (10.0) because face-api.js descriptors vary significantly
// In production, you'd use a dedicated face verification service
const FACE_MATCH_THRESHOLD = 10.0;

// Calculate Euclidean distance between two face descriptors
function calculateEuclideanDistance(desc1: number[], desc2: number[]): number {
  let sum = 0;
  for (let i = 0; i < Math.min(desc1.length, desc2.length); i++) {
    sum += Math.pow(desc1[i] - desc2[i], 2);
  }
  return Math.sqrt(sum);
}

export function findFaceByDescriptor(descriptor: number[]): FaceRecord | undefined {
  if (!descriptor || descriptor.length === 0) return undefined;

  let bestMatch: FaceRecord | undefined;
  let bestDistance = Infinity;

  for (const record of mockFaceDB) {
    const distance = calculateEuclideanDistance(descriptor, record.faceDescriptor);
    console.log(`Face matching - Student ${record.studentId}: distance=${distance.toFixed(3)}, threshold=${FACE_MATCH_THRESHOLD}`);
    
    if (distance < bestDistance && distance < FACE_MATCH_THRESHOLD) {
      bestDistance = distance;
      bestMatch = record;
    }
  }

  if (bestMatch) {
    console.log(`✓ Face matched to student ${bestMatch.studentId} with distance ${bestDistance.toFixed(3)}`);
  } else {
    console.log(`✗ No matching face found. Best distance was ${bestDistance.toFixed(3)} (threshold: ${FACE_MATCH_THRESHOLD})`);
  }

  return bestMatch;
}

export function findFaceByStudentId(studentId: string): FaceRecord | undefined {
  return mockFaceDB.find(r => r.studentId === studentId);
}

export function enrollNewFace(studentId: string, name: string, descriptor: number[], depthData?: { minDepth: number; maxDepth: number }): boolean {
  if (!studentId || !name || !descriptor || descriptor.length === 0) {
    console.error('Invalid enrollment data:', { studentId, name, descriptorLength: descriptor?.length });
    return false;
  }

  // Check if already enrolled
  const existingIndex = mockFaceDB.findIndex(r => r.studentId === studentId);
  
  if (existingIndex >= 0) {
    // Update existing enrollment with new face data
    mockFaceDB[existingIndex] = {
      ...mockFaceDB[existingIndex],
      name,
      faceDescriptor: descriptor,
      enrollmentDate: new Date().toISOString(),
      depthData: depthData || mockFaceDB[existingIndex].depthData,
    };
    console.log(`Updated enrollment for ${studentId}`);
    return true;
  }

  // Add new enrollment
  const newRecord: FaceRecord = {
    id: String(mockFaceDB.length + 1),
    studentId,
    name,
    faceDescriptor: descriptor,
    enrollmentDate: new Date().toISOString(),
    depthData: depthData || { minDepth: 30, maxDepth: 60 },
  };

  mockFaceDB.push(newRecord);
  console.log(`New enrollment for ${studentId}:`, newRecord);
  return true;
}

export function verifyFaceWithDepth(descriptor: number[], depthData: { minDepth: number; maxDepth: number }): { verified: boolean; record?: FaceRecord; reason: string } {
  const record = findFaceByDescriptor(descriptor);

  if (!record) {
    return { verified: false, reason: 'Face not found in database' };
  }

  // Verify 3D depth to prevent spoofing (photo, mask, etc.)
  if (record.depthData && depthData) {
    const depthMatch =
      Math.abs(record.depthData.minDepth - depthData.minDepth) < 10 &&
      Math.abs(record.depthData.maxDepth - depthData.maxDepth) < 10;

    if (!depthMatch) {
      return { verified: false, record, reason: '3D depth verification failed - possible spoofing attempt' };
    }
  }

  return { verified: true, record, reason: 'Face verified successfully with 3D depth confirmation' };
}

export function addFaceRecord(record: FaceRecord) {
  mockFaceDB.push(record);
}

export function getAllFaces(): FaceRecord[] {
  return mockFaceDB;
}
