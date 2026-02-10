// Attempts and cooldown logic
const userAttempts: Record<string, { attempts: number; blockedUntil: number }> = {};

export function recordAttempt(userId: string): void {
  const now = Date.now();
  if (!userAttempts[userId]) {
    userAttempts[userId] = { attempts: 0, blockedUntil: 0 };
  }
  userAttempts[userId].attempts += 1;
  if (userAttempts[userId].attempts >= 3) {
    userAttempts[userId].blockedUntil = now + 5 * 60 * 1000; // 5 min block
  }
}

export function isBlocked(userId: string): boolean {
  const now = Date.now();
  const info = userAttempts[userId];
  return info && info.blockedUntil > now;
}

export function resetAttempts(userId: string): void {
  if (userAttempts[userId]) {
    userAttempts[userId].attempts = 0;
    userAttempts[userId].blockedUntil = 0;
  }
}
