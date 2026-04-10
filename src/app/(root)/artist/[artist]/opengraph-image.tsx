/* eslint-disable @next/next/no-img-element */

import { cacheGetArtistPage } from "@/database/data-cache";
import { ImageResponse } from "next/og";
export const runtime = "edge";
// Image metadata
export const size = {
  width: 1200,
  height: 630,
};
export const alt = "Artist Image";
export const contentType = "image/png";
// Image generation
export default async function Image(props: {
  params: Promise<{ artist: string }>;
}) {
  const params = await props.params;
  const { data, error } = await cacheGetArtistPage(params.artist);
  if (!data || error) return null;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "25px",
        color: "black",
        position: "relative",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "50px",
          right: "200px",
        }}
      >
        <img
          src="https://bubblemusic.vercel.app/bubblelogo.png"
          width={150}
          height={41.62}
          alt="logo"
        />
      </span>

      {data.songs.cover_url ? (
        <img
          src={data.songs.cover_url}
          width={300}
          height={300}
          style={{
            borderRadius: "4px",
          }}
          alt="artist cover photo"
        />
      ) : (
        <svg
          fill="#000"
          width="200"
          height="200"
          viewBox="36 36 128 128"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M121.41 123.93a1.26 1.26 0 1 1 -2.518 0c0 -10.434 -8.459 -18.892 -18.892 -18.892 -10.434 0 -18.893 8.458 -18.893 18.892a1.26 1.26 0 1 1 -2.519 0c0 -11.825 9.586 -21.412 21.412 -21.412 11.825 0 21.411 9.587 21.411 21.412zm-21.411 -23.931c-6.956 0 -12.596 -5.64 -12.596 -12.596s5.64 -12.595 12.596 -12.595 12.595 5.639 12.595 12.595 -5.639 12.596 -12.595 12.596m0 -2.519c5.564 0 10.076 -4.511 10.076 -10.076 0 -5.564 -4.512 -10.076 -10.076 -10.076 -5.566 0 -10.076 4.512 -10.076 10.076 0 5.566 4.511 10.076 10.076 10.076" />
        </svg>
      )}
    </div>,
    { ...size },
  );
}
