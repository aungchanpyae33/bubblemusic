import { useEffect } from "react";
import type { Artist } from "../../../../database.types-fest";
const useMediaSessionDes = (
  name: string,
  artists: Artist[],
  cover_url: string,
) => {
  useEffect(() => {
    if (navigator.mediaSession && window.MediaMetadata) {
      try {
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
      } catch {}
    }
    return () => {
      if (navigator.mediaSession) {
        try {
          navigator.mediaSession.metadata = null;
        } catch {}
      }
    };
  }, [name, artists, cover_url]);
};
export default useMediaSessionDes;
