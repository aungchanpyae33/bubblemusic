import { getSimilarSongQueueClient } from "@/database/client-data";
import {
  currentAddToQueueAction,
  ShouldFetchSongsListId,
  SongDetail,
  SongState,
  useRepeatAndCurrentPlayList,
  useShouldFetchSongsList,
  useSong,
} from "@/lib/zustand";
import { useEffect, useRef } from "react";

function PlaceHolderFetchQueue() {
  const abortController = useRef<AbortController | null>(null);
  const FetchSongsListIdPreRef = useRef<string | null>(null);
  const FetchSongsListId = useShouldFetchSongsList(
    (state: ShouldFetchSongsListId) => state.FetchSongsListId,
  );
  const currentAddToQueue = useRepeatAndCurrentPlayList(
    (state: currentAddToQueueAction) => state.currentAddToQueue,
  );
  const { song_id } = useSong((state: SongState) => state.songCu) as SongDetail;
  useEffect(() => {
    (async () => {
      if (
        FetchSongsListId &&
        FetchSongsListIdPreRef.current !== FetchSongsListId
      ) {
        FetchSongsListIdPreRef.current = FetchSongsListId;
        if (abortController.current) {
          // it will abort when it use with signal
          abortController.current.abort("new fetch initiated for queue");
          abortController.current = null;
        }
        abortController.current = new AbortController();
        const { data, error } = await getSimilarSongQueueClient(
          song_id,
          abortController,
        );
        if (!data || error) return;
        if (
          FetchSongsListId &&
          FetchSongsListIdPreRef.current === FetchSongsListId
        ) {
          const { songs } = data;
          if (!songs) return null;
          currentAddToQueue(songs, songs.idArray);
        }
      }
    })();
    return () => {
      if (!FetchSongsListId) {
        FetchSongsListIdPreRef.current = null;
      }
    };
  }, [song_id, FetchSongsListId, currentAddToQueue]);
  return null;
}

export default PlaceHolderFetchQueue;
