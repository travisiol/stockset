import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/*
 * The share card is the hero with the orb reduced to what Satori can draw:
 * a radial gradient sphere with a bloom behind it. No conic film and no
 * blur filters — Satori supports neither — so the sphere leans on the
 * gradient stops instead.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#06070c",
          backgroundImage:
            "radial-gradient(circle at 18% -10%, rgba(91,140,255,0.55) 0%, transparent 45%), radial-gradient(circle at 90% 10%, rgba(155,123,255,0.4) 0%, transparent 45%)",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              color: "#a8aec2",
              letterSpacing: 4,
            }}
          >
            {siteConfig.name.toUpperCase()} · ROBINHOOD CHAIN
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 76,
              lineHeight: 1.02,
              color: "#eef0f7",
              letterSpacing: -2.5,
            }}
          >
            Any tokenized stock. One token.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 24,
              color: "#a8aec2",
            }}
          >
            Launch a set. Earn on every trade in it.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: 300,
            height: 300,
            borderRadius: 150,
            background:
              "radial-gradient(circle at 32% 26%, #ffffff 0%, #bed6ff 12%, #5a82f5 34%, #18204a 66%, #080a1a 100%)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
