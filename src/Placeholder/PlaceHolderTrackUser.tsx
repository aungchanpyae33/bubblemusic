import { setListEmbedding } from "@/actions/setListEmbedding";
import { setSongEmbedding } from "@/actions/setSongEmbedding";
import {
  listTrackState,
  SongTrackState,
  useListTrack,
  useSongTrack,
} from "@/lib/zustand";
import { useEffect } from "react";

function PlaceHolderTrackUser() {
  const listTrack = useListTrack((state: listTrackState) => state.listTrack);
  const songTrack = useSongTrack((state: SongTrackState) => state.songTrack);
  useEffect(() => {
    async function setSongEmbeddingFn() {
      if (!songTrack || !songTrack.songsId) return;
      const shouldSendSong: boolean = songTrack.count % 5 === 0;
      if (!shouldSendSong) return;
      const { error } = await setSongEmbedding(songTrack.songsId);
      if (error) console.log(error);
    }
    setSongEmbeddingFn();
  }, [songTrack]);

  useEffect(() => {
    async function setListEmbeddingFn() {
      if (!listTrack || !listTrack.id || !listTrack.type) return;
      const { error } = await setListEmbedding(listTrack.type, listTrack.id);
      if (error) console.log(error);
    }
    setListEmbeddingFn();
  }, [listTrack]);
  return null;
}

export default PlaceHolderTrackUser;
