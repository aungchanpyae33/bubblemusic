import { RefObject } from "react";
import type {
  FetchSongsReturn,
  GetLikedIdReturn,
  GetLyricReturn,
  GetRecent,
  GetRecentReturn,
  ListSongsReturn,
  UserLibReturn,
} from "./data-types-return";
import type { Database } from "../../database.types-fest";

export const getListDirectClient = async (
  id: string,
  type: Database["public"]["Enums"]["media_item_type"],
): Promise<ListSongsReturn> => {
  const params = new URLSearchParams({
    id,
    type,
  });
  try {
    const fetchData = await fetch(`/api/getListDirect?${params}`);
    const { data, error } = (await fetchData.json()) as ListSongsReturn;
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const getUserLibClient = async (): Promise<UserLibReturn> => {
  try {
    const fetchData = await fetch("/api/getLib");
    const { data, error } = (await fetchData.json()) as UserLibReturn;
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const getLikedIdClient = async (): Promise<GetLikedIdReturn> => {
  try {
    const fetchData = await fetch("/api/getLike");
    const { data, error } = (await fetchData.json()) as GetLikedIdReturn;
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const getRecentClient = async (): Promise<GetRecent> => {
  try {
    const fetchData = await fetch("/api/getRecent");
    const { data, error } = (await fetchData.json()) as GetRecentReturn;
    if (error || !data) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPlaylistSongsClient = async (
  playlistId: string,
): Promise<ListSongsReturn> => {
  const params = new URLSearchParams({
    id: playlistId,
  });
  try {
    const fetchData = await fetch(`/api/getPlaylist?${params}`);
    const { data, error } = (await fetchData.json()) as ListSongsReturn;
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};
export const getSimilarSongQueueClient = async (
  id: string,
  abortController: RefObject<AbortController | null>,
): Promise<FetchSongsReturn> => {
  const params = new URLSearchParams({
    songId: id,
  });
  const signal = abortController!.current!.signal;
  console.log("sdo");
  try {
    const fetchData = await fetch(`/api/getSimilarSong?${params}`, {
      signal,
    });
    console.log("dnl");
    const { data, error } = (await fetchData.json()) as FetchSongsReturn;
    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
};

// for queue case

export const getSongListClient = async (
  id: string,
  type: Database["public"]["Enums"]["media_item_type"],
): Promise<FetchSongsReturn> => {
  const params = new URLSearchParams({
    id,
    type,
  });
  try {
    const fetchData = await fetch(`/api/fetchSongList?${params}`);
    const { data, error } = (await fetchData.json()) as FetchSongsReturn;
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const checkSongsBeforeAddClient = async ({
  playlistId,
  songId,
}: {
  playlistId: string;
  songId: string;
}) => {
  const params = new URLSearchParams({
    playlistId,
    songId,
  });
  try {
    const fetchData = await fetch(`/api/checkBeforeAdd?${params}`);
    const { exists, error } = await fetchData.json();
    return { exists, error };
  } catch (error) {
    return { exists: false, error };
  }
};

export const getLyricClient = async (
  songId: string,
): Promise<GetLyricReturn> => {
  const params = new URLSearchParams({
    id: songId,
  });
  try {
    const fetchData = await fetch(`/api/getLyric?${params}`);
    const { data, error } = (await fetchData.json()) as GetLyricReturn;

    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};
