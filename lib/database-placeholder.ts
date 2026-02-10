// Database Placeholder
// Use this module to integrate with a real database in production.
// For now, it provides mock storage and retrieval functions.

export type DBRecord = {
  id: string;
  type: string;
  data: any;
};

const mockDB: DBRecord[] = [];

export function addRecord(record: DBRecord) {
  mockDB.push(record);
}

export function getRecordById(id: string): DBRecord | undefined {
  return mockDB.find(r => r.id === id);
}

export function getAllRecords(): DBRecord[] {
  return mockDB;
}