// Watermark utility for documents
export function addWatermark(text: string, watermark: string): string {
  // Simple text watermarking for demonstration
  return `${text}\n\n--- WATERMARK: ${watermark} ---`;
}