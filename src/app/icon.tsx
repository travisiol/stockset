import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/*
 * The mark at favicon size: two rings overlapping on a lit square.
 *
 * Drawn with divs rather than the SVG in `Mark.tsx` because this renders
 * through Satori, which lays out flexbox and borders and not much else. The
 * filled lens is dropped here — at 16px in a browser tab it would close up
 * into a blob.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(160deg, #6f97ff 0%, #7b5bd6 100%)",
          borderRadius: 14,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              border: "4px solid #ffffff",
            }}
          />
          <div
            style={{
              width: 30,
              height: 30,
              marginLeft: -14,
              borderRadius: 15,
              border: "4px solid #ffffff",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
