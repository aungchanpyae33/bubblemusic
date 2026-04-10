/* eslint-disable @next/next/no-img-element */

import { cacheGetPlaylistSongs } from "@/database/data-cache";
import { ImageResponse } from "next/og";
export const runtime = "edge";
// Image metadata
export const size = {
  width: 1200,
  height: 630,
};
export const alt = "Playlist Image";
export const contentType = "image/png";
// Image generation
export default async function Image(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { data, error } = await cacheGetPlaylistSongs(params.slug);
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
          alt="playlist cover photo"
        />
      ) : (
        <svg
          fill="#000"
          width="200"
          height="200"
          viewBox="36 36 128 128"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path d="M158.567 139.17V71.03c0 -3.652 -3.022 -6.676 -6.676 -6.676l-54.032 0.001 -15.366 -8.816c-1.637 -1.008 -3.526 -1.512 -5.416 -1.512h-28.97c-3.652 0 -6.676 3.022 -6.676 6.676v78.343c0 3.652 3.022 6.676 6.676 6.676h103.785c3.652 0.125 6.675 -2.898 6.675 -6.551zm-114.615 0V60.828c0 -2.268 1.89 -4.156 4.156 -4.156h28.97c1.512 0 2.897 0.378 4.156 1.134l15.618 8.943c0.252 0.126 0.378 0.126 0.63 0.126h54.285c2.268 0 4.156 1.89 4.156 4.156v68.14c0 2.268 -1.89 4.156 -4.156 4.156h-103.657c-2.268 0 -4.157 -1.889 -4.157 -4.156z" />
            <path d="M119.017 77.203c-0.378 -0.252 -0.756 -0.252 -1.134 -0.126l-33 10.58c-0.504 0.126 -0.882 0.63 -0.882 1.26v34.51c-1.386 -1.008 -3.401 -1.638 -5.542 -1.638 -4.534 0 -8.06 2.644 -8.06 6.046 0 3.401 3.526 6.046 8.06 6.046s8.06 -2.644 8.06 -6.046V99.244l30.48 -9.95v23.427c-1.385 -1.008 -3.4 -1.638 -5.542 -1.638 -4.534 0 -8.06 2.644 -8.06 6.046 0 3.401 3.526 6.046 8.06 6.046s8.06 -2.644 8.06 -6.046v-0.378l0.001 -38.54c0 -0.504 -0.126 -0.882 -0.504 -1.008zM78.46 131.363c-3.022 0 -5.542 -1.637 -5.542 -3.526 0 -1.89 2.519 -3.526 5.542 -3.526s5.542 1.637 5.542 3.526c0 1.89 -2.519 3.526 -5.542 3.526m8.06 -34.763v-6.802l30.48 -9.949v6.802zm24.939 24.058c-3.022 0 -5.542 -1.637 -5.542 -3.526 0 -1.89 2.519 -3.526 5.542 -3.526s5.542 1.637 5.542 3.526 -2.518 3.526 -5.542 3.526" />
          </g>
        </svg>
      )}
    </div>,
    { ...size },
  );
}
