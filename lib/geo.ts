import maps from "./map-geo.json";

export type MapName = "karte-region" | "karte-standort";

const mercY = (lat: number) => Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360));

export function mapInfo(name: MapName) {
  const m = maps.find((x) => x.name === name);
  if (!m) throw new Error(`Karte ${name} fehlt – scripts/build-map.mjs ausführen`);
  return m;
}

/** Position eines Punktes in Prozent der Kartenbreite/-höhe */
export function project(name: MapName, lat: number, lon: number) {
  const { bbox } = mapInfo(name);
  const [w, s, e, n] = bbox;
  return {
    x: ((lon - w) / (e - w)) * 100,
    y: ((mercY(n) - mercY(lat)) / (mercY(n) - mercY(s))) * 100,
  };
}

/** Pixel pro Kilometer (horizontal) auf der Originalkarte */
export function pxPerKm(name: MapName, lat: number) {
  const { bbox, width } = mapInfo(name);
  return width / (bbox[2] - bbox[0]) / (111.32 * Math.cos((lat * Math.PI) / 180));
}
