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
          background: "#faf9f5",
          padding: "80px",
          fontFamily: "sans-serif",
          borderTop: "12px solid #d97757",
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
              background: "#d97757",
              color: "#faf9f5",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            ME
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#87867f",
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
              fontSize: "90px",
              fontWeight: 700,
              color: "#141413",
              lineHeight: 1.0,
              letterSpacing: "-3px",
            }}
          >
            {profile.name}
          </div>
          <div style={{ fontSize: "32px", color: "#3d3d3a", marginTop: "22px" }}>
            {profile.title}
          </div>
          <div style={{ fontSize: "24px", color: "#87867f", marginTop: "8px" }}>
            {profile.subtitle}
          </div>
        </div>

        <div
          style={{
            fontSize: "20px",
            color: "#87867f",
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
