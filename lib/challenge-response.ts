// Challenge-response logic for verification
export function getChallenge(): string {
  // Simple challenge for demo
  return "What is 2 + 2?";
}

export function verifyResponse(response: string): boolean {
  return response.trim() === "4";
}
