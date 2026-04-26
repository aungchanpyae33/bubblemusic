import { setListEmbedding } from "@/actions/setListEmbedding";
import { setSongEmbedding } from "@/actions/setSongEmbedding";
import { useUserInfoContext } from "@/Context/ContextUserInfo";
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
  const { userInfo } = useUserInfoContext();
  useEffect(() => {
    async function setSongEmbeddingFn() {
      if (!userInfo) {
        return null;
      }
      if (!songTrack || !songTrack.songsId) return null;
      const shouldSendSong: boolean = songTrack.count % 5 === 0;
      if (!shouldSendSong) return null;
      const { error } = await setSongEmbedding(songTrack.songsId);
      if (error) console.log(error);
    }
    setSongEmbeddingFn();
  }, [songTrack, userInfo]);

  useEffect(() => {
    async function setListEmbeddingFn() {
      if (!userInfo) {
        return null;
      }
      if (!listTrack || !listTrack.id || !listTrack.type) return null;
      const { error } = await setListEmbedding(listTrack.type, listTrack.id);
      if (error) console.log(error);
    }
    setListEmbeddingFn();
  }, [listTrack, userInfo]);
  return null;
}

export default PlaceHolderTrackUser;
