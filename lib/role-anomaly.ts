// Role-based anomaly detection (no ML)
export function isActionAllowed(role: string, action: string): boolean {
  const rolePermissions: Record<string, string[]> = {
    student: ['view', 'request', 'pay'],
    alumni: ['view', 'request', 'pay'],
    admin: ['view', 'request', 'pay', 'manage', 'block'],
  };
  return rolePermissions[role]?.includes(action) ?? false;
}
