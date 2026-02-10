// Camera 3D depth settings
export type CameraDirection = 'left' | 'right' | 'center';

export function setCameraDirection(direction: CameraDirection): string {
  return `Camera is now facing ${direction}.`;
}
