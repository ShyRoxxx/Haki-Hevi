// Baut die Kartenbilder aus OpenStreetMap-Kacheln (einmalig beim Entwickeln, nicht zur Laufzeit).
// Daten © OpenStreetMap-Mitwirkende, ODbL. https://www.openstreetmap.org/copyright
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const UA = "HakiHevi-Website-Build/1.0 (statische Karte, einmaliger Abruf)";
const CACHE = path.resolve("scripts/.cache/tiles");
await fs.mkdir(CACHE, { recursive: true });

const lon2x = (lon, z) => ((lon + 180) / 360) * 2 ** z * 256;
const lat2y = (lat, z) => {
  const r = (lat * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * 2 ** z * 256;
};

async function tile(z, x, y) {
  const file = path.join(CACHE, `${z}-${x}-${y}.png`);
  try {
    return await fs.readFile(file);
  } catch {}
  const res = await fetch(`https://tile.openstreetmap.org/${z}/${x}/${y}.png`, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`Kachel ${z}/${x}/${y}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(file, buf);
  await new Promise((r) => setTimeout(r, 120));
  return buf;
}

function hexToRgb(h) {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

async function build({ name, bbox, z, dark, light, lo = 0, hi = 1, gamma = 1 }) {
  const [west, south, east, north] = bbox;
  const x0 = lon2x(west, z), x1 = lon2x(east, z);
  const y0 = lat2y(north, z), y1 = lat2y(south, z);
  const tx0 = Math.floor(x0 / 256), tx1 = Math.floor(x1 / 256);
  const ty0 = Math.floor(y0 / 256), ty1 = Math.floor(y1 / 256);
  const composites = [];
  for (let tx = tx0; tx <= tx1; tx++)
    for (let ty = ty0; ty <= ty1; ty++)
      composites.push({ input: await tile(z, tx, ty), left: (tx - tx0) * 256, top: (ty - ty0) * 256 });
  const W = (tx1 - tx0 + 1) * 256, H = (ty1 - ty0 + 1) * 256;
  const mosaic = await sharp({ create: { width: W, height: H, channels: 3, background: "#fff" } })
    .composite(composites).png().toBuffer();
  const left = Math.round(x0 - tx0 * 256), top = Math.round(y0 - ty0 * 256);
  const cw = Math.round(x1 - x0), ch = Math.round(y1 - y0);
  // Graustufen -> Duoton in den Markenfarben
  const { data, info } = await sharp(mosaic).extract({ left, top, width: cw, height: ch })
    .greyscale().raw().toBuffer({ resolveWithObject: true });
  const d = hexToRgb(dark), l = hexToRgb(light);
  const out = Buffer.alloc(info.width * info.height * 3);
  for (let i = 0; i < info.width * info.height; i++) {
    const t = Math.pow(Math.min(1, Math.max(0, (data[i] / 255 - lo) / (hi - lo))), gamma);
    out[i * 3] = d[0] + (l[0] - d[0]) * t;
    out[i * 3 + 1] = d[1] + (l[1] - d[1]) * t;
    out[i * 3 + 2] = d[2] + (l[2] - d[2]) * t;
  }
  const base = sharp(out, { raw: { width: info.width, height: info.height, channels: 3 } });
  await base.clone().webp({ quality: 82 }).toFile(`public/img/${name}.webp`);
  console.log(name, info.width, "x", info.height);
  return { name, bbox, width: info.width, height: info.height };
}

const maps = [];
// Region: Küche Isernhagen NB bis Brelingen (Wedemark) und Burgwedel
maps.push(await build({ name: "karte-region", bbox: [9.58, 52.41, 10.0, 52.585], z: 13, dark: "#36591d", light: "#d5e4bf", lo: 0.62, hi: 0.98, gamma: 1.6 }));
// Standort: Dieselstraße, Niedernhägener Bauerschaft
maps.push(await build({ name: "karte-standort", bbox: [9.7735, 52.4465, 9.7985, 52.4575], z: 16, dark: "#6f8a58", light: "#f5f7ef", lo: 0.45, hi: 0.97, gamma: 1.2 }));
await fs.writeFile("lib/map-geo.json", JSON.stringify(maps, null, 2) + "\n");
