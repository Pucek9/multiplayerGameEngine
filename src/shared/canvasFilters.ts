import { Colors } from './types';

export function grayscale(pixels: ImageData): ImageData {
  const d = pixels.data;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];
    // CIE luminance for the RGB
    // The human eye is bad at seeing red and blue, so we de-emphasize them.
    const v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    d[i] = d[i + 1] = d[i + 2] = v;
  }
  return pixels;
}

export function brightness(pixels: ImageData, params: { adjustment: number }): ImageData {
  const d = pixels.data;
  const adjustment = params.adjustment;
  for (let i = 0; i < d.length; i += 4) {
    d[i] += adjustment;
    d[i + 1] += adjustment;
    d[i + 2] += adjustment;
  }
  return pixels;
}

export function rgb(pixels: ImageData, params: Colors): ImageData {
  const d = pixels.data,
    nPixels = d.length,
    { red, green, blue } = params;

  for (let i = 0; i < nPixels; i += 4) {
    const brightness = (0.34 * d[i] + 0.5 * d[i + 1] + 0.16 * d[i + 2]) / 255;
    d[i] = brightness * red; // r
    d[i + 1] = brightness * green; // g
    d[i + 2] = brightness * blue; // b
    d[i + 3] = d[i + 3]; // alpha
  }
  return pixels;
}
