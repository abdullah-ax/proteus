import sharp from "sharp";

export async function computePHash(imageBuffer: ArrayBuffer): Promise<number[]> {
  const pixels = await sharp(Buffer.from(imageBuffer))
    .grayscale()
    .resize(8, 8, { fit: "fill" })
    .raw()
    .toBuffer();

  const values = Array.from(pixels);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;

  return values.map((v) => (v >= mean ? 1.0 : 0.0));
}
