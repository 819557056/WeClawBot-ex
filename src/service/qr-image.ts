import QRCodeModule from "qrcode-terminal/vendor/QRCode/index.js";
import QRErrorCorrectLevelModule from "qrcode-terminal/vendor/QRCode/QRErrorCorrectLevel.js";

type QRCodeConstructor = new (
  typeNumber: number,
  errorCorrectLevel: unknown,
) => {
  addData: (data: string) => void;
  make: () => void;
  getModuleCount: () => number;
  isDark: (row: number, col: number) => boolean;
};

const QRCode = QRCodeModule as QRCodeConstructor;
const QRErrorCorrectLevel = QRErrorCorrectLevelModule;

export async function renderQrImageDataUrl(
  input: string,
  opts: { scale?: number; marginModules?: number } = {},
): Promise<string | undefined> {
  const { scale = 6, marginModules = 4 } = opts;
  const qr = new QRCode(-1, QRErrorCorrectLevel.L);
  qr.addData(input);
  qr.make();

  const modules = qr.getModuleCount();
  const size = (modules + marginModules * 2) * scale;
  const rects: string[] = [];

  for (let row = 0; row < modules; row += 1) {
    for (let col = 0; col < modules; col += 1) {
      if (!qr.isDark(row, col)) continue;
      const x = (col + marginModules) * scale;
      const y = (row + marginModules) * scale;
      rects.push(`<rect x="${x}" y="${y}" width="${scale}" height="${scale}"/>`);
    }
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="white"/> <g fill="black">${rects.join("")}</g></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
