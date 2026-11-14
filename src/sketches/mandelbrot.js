export const params = {
  iterations: { label: 'Iterations', value: 100, min: 10, max: 5000, step: 10 },
  centerX:    { label: 'Center (re)', value: -0.5, min: -2.5, max: 1, step: 0.01 },
  centerY:    { label: 'Center (im)', value: 0, min: -1.5, max: 1.5, step: 0.01 },
  zoom:       { label: 'Zoom (log₂)', value: 0, min: 0, max: 20, step: 0.1 },
};

// export default function draw(ctx, info, values) { ... } as before

export default function draw(ctx, { width, height, dpr }, { iterations, centerX, centerY, zoom }) {
  // Work in device pixels: putImageData ignores the canvas transform.
  const pw = Math.round(width * dpr);
  const ph = Math.round(height * dpr);
  const img = ctx.createImageData(pw, ph);
  const px = new Uint32Array(img.data.buffer);
  const step = (2 / 2 ** zoom) / ph; // complex units per pixel

  for (let y = 0; y < ph; y++) {
    const ci = centerY + (y - ph / 2) * step;
    for (let x = 0; x < pw; x++) {
      const cr = centerX + (x - pw / 2) * step;
      let zr = 0, zi = 0, i = 0;
      while (zr * zr + zi * zi < 4 && i < iterations) {
        const t = zr * zr - zi * zi + cr;
        zi = 2 * zr * zi + ci;
        zr = t;
        i++;
      }
      const v = i === iterations ? 0 : 255 - Math.floor((i / iterations) * 255);
      px[y * pw + x] = (255 << 24) | (v << 16) | (v << 8) | v;
    }
  }
  ctx.putImageData(img, 0, 0);
}