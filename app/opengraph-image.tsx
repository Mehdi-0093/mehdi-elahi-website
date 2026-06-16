import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { site } from "@/data/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: "80px",
          fontFamily: "sans-serif",
          borderTop: "12px solid #e1695e",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              background: "#e1695e",
              color: "#ffffff",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            ME
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#808080",
              textTransform: "uppercase",
              letterSpacing: "4px",
            }}
          >
            {profile.location}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "92px",
              fontWeight: 400,
              color: "#ffffff",
              lineHeight: 0.95,
              letterSpacing: "-4px",
            }}
          >
            {profile.name}
          </div>
          <div style={{ fontSize: "32px", color: "#ffffff", marginTop: "22px" }}>
            {profile.title}
          </div>
          <div style={{ fontSize: "24px", color: "#9a9a9a", marginTop: "8px" }}>
            {profile.subtitle}
          </div>
        </div>

        <div
          style={{
            fontSize: "20px",
            color: "#808080",
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          {site.url.replace("https://", "")}
        </div>
      </div>
    ),
    { ...size }
  );
}
