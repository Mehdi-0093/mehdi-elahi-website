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
          background: "#fcfcfb",
          padding: "80px",
          fontFamily: "sans-serif",
          borderTop: "12px solid #1e3a5f",
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
              borderRadius: "14px",
              background: "#1e3a5f",
              color: "#ffffff",
              fontSize: "30px",
              fontWeight: 700,
            }}
          >
            ME
          </div>
          <div style={{ fontSize: "24px", color: "#565d6b" }}>
            {profile.location}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "84px",
              fontWeight: 700,
              color: "#15181d",
              lineHeight: 1.04,
            }}
          >
            {profile.name}
          </div>
          <div style={{ fontSize: "34px", color: "#1e3a5f", marginTop: "18px" }}>
            {profile.title}
          </div>
          <div style={{ fontSize: "26px", color: "#565d6b", marginTop: "8px" }}>
            {profile.subtitle}
          </div>
        </div>

        <div style={{ fontSize: "22px", color: "#8b93a1" }}>
          {site.url.replace("https://", "")}
        </div>
      </div>
    ),
    { ...size }
  );
}
