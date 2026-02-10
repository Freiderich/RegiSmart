// Mock student database with credentials mapping
export type StudentRecord = {
  id: string;
  studentNumber: string;
  fullName: string;
  email: string;
  password: string; // In production, this would be hashed
};

export const mockStudentsDB: StudentRecord[] = [
  {
    id: '1',
    studentNumber: '20876916',
    fullName: 'Abdul Waahab Jandali',
    email: 'asjandali@student.hau.edu.ph',
    password: 'password123', // Demo password
  },
  {
    id: '2',
    studentNumber: '2024-123456',
    fullName: 'Juan Dela Cruz',
    email: 'juan.delacruz@student.hau.edu.ph',
    password: 'password123',
  },
  {
    id: '3',
    studentNumber: '2024-654321',
    fullName: 'Maria Santos',
    email: 'maria.santos@student.hau.edu.ph',
    password: 'password123',
  },
];

// Verify credentials and return student record
export function verifyCredentials(email: string, password: string): StudentRecord | null {
  const student = mockStudentsDB.find(s => s.email === email && s.password === password);
  return student || null;
}

// Get student by email
export function getStudentByEmail(email: string): StudentRecord | null {
  const student = mockStudentsDB.find(s => s.email === email);
  
  // Check if email is registered during face enrollment (from localStorage)
  if (!student && typeof window !== 'undefined') {
    const enrollments = JSON.parse(localStorage.getItem('faceEnrollments') || '{}');
    for (const studentId in enrollments) {
      if (enrollments[studentId].email === email) {
        return {
          id: studentId,
          studentNumber: studentId,
          fullName: enrollments[studentId].name,
          email: enrollments[studentId].email,
          password: 'enrolled', // Mark as enrolled without password
        };
      }
    }
  }
  
  return student || null;
}

// Get student by student number
export function getStudentByNumber(studentNumber: string): StudentRecord | null {
  const student = mockStudentsDB.find(s => s.studentNumber === studentNumber);
  
  // Check if student number is registered during face enrollment (from localStorage)
  if (!student && typeof window !== 'undefined') {
    const enrollments = JSON.parse(localStorage.getItem('faceEnrollments') || '{}');
    if (enrollments[studentNumber]) {
      return {
        id: studentNumber,
        studentNumber: studentNumber,
        fullName: enrollments[studentNumber].name,
        email: enrollments[studentNumber].email,
        password: 'enrolled',
      };
    }
  }
  
  return student || null;
}
