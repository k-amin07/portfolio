import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0d0d0f",
          color: "#ececee",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#a3a3ac" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#93a9ff" }} />
          {`${site.role} · ${site.focus}`}
        </div>
        <div style={{ display: "flex", fontSize: 60, fontWeight: 600, lineHeight: 1.12, letterSpacing: -2, maxWidth: 1000 }}>
          {site.headline}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30 }}>
          <span>{site.name}</span>
          <span style={{ color: "#a3a3ac" }}>khizaramin.com</span>
        </div>
      </div>
    ),
    size,
  );
}
