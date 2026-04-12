import { useEffect } from "react";
import type { Artist } from "../../../../database.types-fest";
const useMediaSessionDes = (
  name: string,
  artists: Artist[],
  cover_url: string,
) => {
  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: name,
        artist: artists.map((artist) => artist.name).join(", "),
        artwork: [
          {
            src: cover_url,
            sizes: "300x300",
            type: "image/jpg",
          },
        ],
      });
    }
    return () => {
      navigator.mediaSession.metadata = null;
    };
  }, [name, artists, cover_url]);
};
export default useMediaSessionDes;
