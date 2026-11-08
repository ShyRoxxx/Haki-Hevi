import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };

/** Teilen-Bild im Stil des Heros: Karte in Logo-Grün, Küche markiert, Aussage auf heller Karte */
export async function renderOg({ statement, line }: { statement: string; line: string }) {
  const [map, logo, display, text] = await Promise.all([
    readFile(join(process.cwd(), "lib", "og", "og-map.jpg")),
    readFile(join(process.cwd(), "public", "brand", "logo.png")),
    readFile(join(process.cwd(), "node_modules", "@fontsource", "bricolage-grotesque", "files", "bricolage-grotesque-latin-600-normal.woff")),
    readFile(join(process.cwd(), "node_modules", "@fontsource", "figtree", "files", "figtree-latin-600-normal.woff")),
  ]);
  const mapSrc = `data:image/jpeg;base64,${map.toString("base64")}`;
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#3f6a1f" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mapSrc} width={1200} height={630} alt="" style={{ position: "absolute", inset: 0 }} />
        <svg width="64" height="82" viewBox="0 0 44 56" style={{ position: "absolute", left: 712, top: 309 }}>
          <path d="M22 55C22 55 42 33.5 42 21A20 20 0 0 0 2 21C2 33.5 22 55 22 55Z" fill="#e9b949" stroke="#1e2a17" strokeWidth="2" />
          <circle cx="22" cy="21" r="7.5" fill="#1e2a17" />
        </svg>
        <div style={{ position: "absolute", right: 16, bottom: 14, display: "flex", fontFamily: "Figtree", fontSize: 16, color: "#1e2a17", background: "rgba(253,254,249,0.9)", padding: "3px 8px", borderRadius: 6 }}>
          © OpenStreetMap-Mitwirkende
        </div>
        <div
          style={{
            position: "absolute",
            left: 56,
            top: 56,
            bottom: 56,
            width: 600,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "#fdfef9",
            borderRadius: 28,
            padding: "44px 48px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={290} height={80} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Bricolage", fontSize: 60, lineHeight: 1.04, letterSpacing: -1.2, color: "#1e2a17" }}>{statement}</div>
            <div style={{ marginTop: 20, fontFamily: "Figtree", fontSize: 27, lineHeight: 1.3, color: "#3f6a1f" }}>{line}</div>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Bricolage", data: display, weight: 600, style: "normal" },
        { name: "Figtree", data: text, weight: 600, style: "normal" },
      ],
    },
  );
}
