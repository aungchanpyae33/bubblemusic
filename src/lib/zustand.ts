import type { Artist, SongInfo } from "../../database.types-fest";
import type { ListSongPage } from "@/database/data-types-return";
import { RefObject } from "react";
import { createWithEqualityFn as create } from "zustand/traditional";
import { persist } from "zustand/middleware";

export interface SongDetail {
  url: string;
  sege: number;
  duration: number;
  song_time_stamp: Array<number>;
  name: string;
  id: string;
  song_id: string;
  is_lyric: boolean;
  artists: Artist[];
  cover_url: string;
}

export interface IsRepeatState {
  isRepeat: boolean;
}
export interface RepeatAction {
  setRepeat: () => void;
}
export interface PrefetchAction {
  prefetchSegment: (params: PrefetchParams) => Promise<ArrayBuffer[] | null>;
}
export interface PrefetchParams {
  id: string;
  abortController: RefObject<AbortController | null>;
  prefetchedUrl: RefObject<string>;
  prefetchPromiseRef: RefObject<Promise<
    [ArrayBuffer, ArrayBuffer] | null
  > | null>;
}
export interface SongState {
  songCu: SongDetail | object;
}
export interface SongActions {
  updateSongCu: (newSong: SongState["songCu"]) => void;
}
export interface StorePlayListIdState {
  playlistId: object;
}
export interface StorePlayListIdStateAction {
  setPlaylistId: (id: StorePlayListIdState["playlistId"]) => void;
}

export interface ShouldFetchSongsListId {
  FetchSongsListId: string | undefined;
}
export interface ShouldFetchSongsListIdAction {
  FetchSongsListIdAction: (
    id: ShouldFetchSongsListId["FetchSongsListId"],
  ) => void;
}
export interface currentSongPlaylist {
  playListArray: Record<string, ListSongPage>;
}

export interface currentSongPlaylistAction {
  setPlayListArray: (newList: currentSongPlaylist["playListArray"]) => void;
}

export interface currentSongPlaylisthuffleAction {
  shufflePlayListArray: (nweList: currentSongPlaylist["playListArray"]) => void;
}
export interface currentAddToQueueAction {
  currentAddToQueue: (songs: NormalizedById<SongInfo>, id: string[]) => void;
}

export interface currentAddToNextAction {
  currentAddToNext: (
    songs: NormalizedById<SongInfo>,
    id: string[],
    curId: string,
  ) => void;
}
export interface removeFromQueueAction {
  removeFromQueue: (id: string) => void;
}
export interface previousSongPlaylist {
  previousPlayListArray: ListSongPage | object;
}

export interface resetAction {
  reset: () => void;
}
export interface previousSongPlaylistAction {
  setPreviousPlayListArray: (
    newList: previousSongPlaylist["previousPlayListArray"],
  ) => void;
}

export interface Playlist {
  id: string;
  name: string;
}

export interface playlistFolderProps {
  playlistFolder: Playlist[] | null;
}

export interface setPlaylistFolderAction {
  setPlaylistFolder: (data: Playlist[]) => void;
}

export interface addPlaylistFolderAction {
  addPlaylistFolder: (value: Playlist) => void;
}

export interface addSongProps {
  addSong: object;
}
export interface addSongAction {
  addSongAction: (value: addSongProps["addSong"]) => void;
}

export interface toggleLikeProps {
  toggleLike: object;
}
export interface toggleLikeAction {
  toggleLikeAction: (value: toggleLikeProps["toggleLike"]) => void;
}

export interface SongFunctionState {
  Isplay: Record<string, boolean | undefined>;
}
export interface SongFunctionActions {
  setPlay: (key: string, play: true | undefined) => void;
}

export interface DirectPlayBackState {
  IsPlayList: Record<string, boolean | undefined>;
}
export interface DirectPlayBackAction {
  setPlayList: (key: string, play: true | undefined) => void;
}
export interface AudioValueState {
  value: number;
}
export interface AudioValueActions {
  setValue: (newValue: number) => void;
}

export interface AudioDraggingState {
  isDragging: boolean;
}
export interface AudioDraggingActions {
  setIsDragging: (newState: boolean) => void;
}

export interface VolumeValueState {
  value: number;
}
export interface VolumeValueActions {
  setValue: (newValue: number) => void;
}
export interface VolumeDraggingState {
  isDragging: boolean;
}
export interface VolumeDraggingActions {
  setIsDragging: (newState: boolean) => void;
}

export interface queueState {
  isQueue: boolean;
}

export interface queueStateAction {
  setIsQueue: (value: boolean) => void;
}

export interface focusState {
  isInputFocus: boolean;
}

export interface focusStateAction {
  setIsInputFocus: (value: boolean) => void;
}

// need to select them with object key as there will be used for many component
export const useSong = create<SongState & SongActions & resetAction>()(
  (set) => ({
    songCu: {},
    updateSongCu: (newSong) =>
      set(() => ({
        songCu: { ...newSong },
      })),
    reset: () => {
      set({ songCu: {} });
    },
  }),
);

export const usePreviousPlayList = create<
  previousSongPlaylist & previousSongPlaylistAction & resetAction
>()((set) => ({
  previousPlayListArray: {},
  setPreviousPlayListArray: (newList) =>
    set(() => {
      return { previousPlayListArray: { ...newList } };
    }),
  reset: () => {
    set({ previousPlayListArray: {} });
  },
}));

export const useSongFunction = create<SongFunctionState & SongFunctionActions>(
  (set) => ({
    Isplay: {},
    setPlay: (key, play) =>
      set((state) => {
        const getKey =
          key === "toggle_key" ? Object.keys(state.Isplay)[0] : key;
        return {
          Isplay: {
            [getKey]: play ?? !state.Isplay[getKey],
          },
        };
      }),
  }),
);

export const useStorePlayListId = create<
  StorePlayListIdState & StorePlayListIdStateAction & resetAction
>()((set) => ({
  playlistId: {},
  setPlaylistId: (id) =>
    set(() => ({
      playlistId: { ...id },
    })),
  reset: () => {
    set({ playlistId: {} });
  },
}));

export const useShouldFetchSongsList = create<
  ShouldFetchSongsListId & ShouldFetchSongsListIdAction
>()((set) => ({
  FetchSongsListId: undefined,
  FetchSongsListIdAction: (id) =>
    set(() => ({
      FetchSongsListId: id,
    })),
}));

export const useDirectPlayBack = create<
  DirectPlayBackState & DirectPlayBackAction
>((set) => ({
  IsPlayList: {},
  setPlayList: (key, play) =>
    set((state) => {
      const getKey =
        key === "toggle_key" ? Object.keys(state.IsPlayList)[0] : key;
      return {
        IsPlayList: {
          [getKey]: play ?? !state.IsPlayList[getKey],
        },
      };
    }),
}));

export const useRepeatAndCurrentPlayList = create<
  currentSongPlaylist &
    currentSongPlaylistAction &
    currentSongPlaylisthuffleAction &
    currentAddToQueueAction &
    currentAddToNextAction &
    removeFromQueueAction &
    IsRepeatState &
    RepeatAction &
    PrefetchAction &
    resetAction
>()((set, get) => ({
  playListArray: {},

  setPlayListArray: (newList) =>
    set((state) => {
      const newKey = Object.keys(newList)[0];
      const oldKey = Object.keys(state.playListArray)[0];
      if (newKey === oldKey) return state;
      return { playListArray: { ...newList } };
    }),

  shufflePlayListArray: (newList) =>
    set(() => ({ playListArray: { ...newList } })),

  currentAddToQueue: (songs, ids) =>
    set((state) => {
      const key = Object.keys(state.playListArray)[0];
      const playlist = state.playListArray[key];
      if (!playlist?.songs) return state;

      return {
        playListArray: {
          ...state.playListArray,
          [key]: {
            ...playlist,
            songs: {
              byId: { ...playlist.songs.byId, ...songs.byId },
              idArray: [...playlist.songs.idArray, ...ids],
            },
          },
        },
      };
    }),

  currentAddToNext: (songs, ids, curId) =>
    set((state) => {
      const key = Object.keys(state.playListArray)[0];
      const playlist = state.playListArray[key];
      if (!playlist?.songs) return state;

      const currentIndex = outputCurrentIndex(playlist.songs.idArray, curId);
      if (currentIndex === -1) return state;

      const nextIds = [...playlist.songs.idArray];
      nextIds.splice(currentIndex + 1, 0, ...ids);

      return {
        playListArray: {
          ...state.playListArray,
          [key]: {
            ...playlist,
            songs: {
              byId: { ...playlist.songs.byId, ...songs.byId },
              idArray: nextIds,
            },
          },
        },
      };
    }),

  removeFromQueue: (id) =>
    set((state) => {
      const key = Object.keys(state.playListArray)[0];
      const playlist = state.playListArray[key];
      if (!playlist?.songs) return state;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: _, ...restById } = playlist.songs.byId;

      return {
        playListArray: {
          ...state.playListArray,
          [key]: {
            ...playlist,
            songs: {
              byId: restById,
              idArray: playlist.songs.idArray.filter((x) => x !== id),
            },
          },
        },
      };
    }),
  isRepeat: false,
  setRepeat: () => set((state) => ({ isRepeat: !state.isRepeat })),
  // if it check as isRepeat in function component, it will re-render entrire component
  prefetchSegment: async ({
    id,
    abortController,
    prefetchedUrl,
    prefetchPromiseRef,
  }: PrefetchParams) => {
    if (get().isRepeat) return null;

    const fetchOptions: RequestInit = {
      signal: abortController!.current!.signal,
    };

    const playlistArray = Object.values(
      get().playListArray,
    )[0] as excludeCurrentSongsList;

    const currentIndex = outputCurrentIndex(playlistArray.songs.idArray, id);

    const extract = Math.min(
      currentIndex + 1,
      playlistArray.songs.idArray.length - 1,
    );
    const { id: id_scope, url } =
      playlistArray.songs.byId[playlistArray.songs.idArray[extract]];

    if (
      currentIndex >= playlistArray.songs.idArray.length - 1 &&
      id === id_scope
    ) {
      return prefetchPromiseRef.current;
    }

    const initUrl = url;
    const seg1Url = url.replace("init.mp4", "seg-1.m4s");

    try {
      // if prefetch promise is not null , means they are waiting some promise, if then return this promise to receive the data
      if (!prefetchPromiseRef.current) {
        // immediate update url to inform there is a prefetch call
        prefetchedUrl.current = url;
        prefetchPromiseRef.current = Promise.all([
          fetch(initUrl, fetchOptions).then((res) => res.arrayBuffer()),
          fetch(seg1Url, fetchOptions).then((res) => res.arrayBuffer()),
        ]).catch((err): [ArrayBuffer, ArrayBuffer] | null => {
          //if there is error, reset the prefetchUrl to false the condition check in mediaSourceBuffer.ts
          prefetchedUrl.current = "";
          if (err instanceof DOMException && err.name === "AbortError") {
            return null;
          }
          throw err;
        });
      }
      return prefetchPromiseRef.current;
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return null;
      } else {
        throw err;
      }
    }
  },
  reset: () => {
    set(() => ({
      playListArray: {},
      isRepeat: false,
    }));
  },
}));

export const useAudioValue = create<AudioValueState & AudioValueActions>(
  (set) => ({
    value: 100,
    setValue: (newValue: number) =>
      set(() => ({
        value: newValue,
      })),
  }),
);

// no need to select with object key
export const useAudioDragging = create<
  AudioDraggingState & AudioDraggingActions
>((set) => ({
  isDragging: false,
  setIsDragging: (newState: boolean) =>
    set(() => ({
      isDragging: newState,
    })),
}));

export const useVolumeValue = create<VolumeValueState & VolumeValueActions>()(
  persist(
    (set) => ({
      value: 0,
      setValue: (newValue: number) =>
        set(() => ({
          value: newValue,
        })),
    }),
    {
      name: "volume-storage", // key in localStorage
    },
  ),
);

export const useVolumeDragging = create<
  VolumeDraggingState & VolumeDraggingActions
>((set) => ({
  isDragging: false,
  setIsDragging: (newState: boolean) =>
    set(() => ({
      isDragging: newState,
    })),
}));

export const useOnlyOneSider = create<queueState & queueStateAction>((set) => ({
  isQueue: false,
  setIsQueue: (value: boolean) => set(() => ({ isQueue: value })),
}));

export interface isFallBackAudioState {
  isFallBackAudio: boolean;
}
export interface isFallBackAudioActions {
  setIsFallBackAudio: () => void;
}

export const useInstantFallBackAudioFull = create<
  isFallBackAudioState & isFallBackAudioActions
>((set) => ({
  isFallBackAudio: false,
  setIsFallBackAudio: () =>
    set((state) => {
      if (state.isFallBackAudio) {
        return {};
      }
      return { isFallBackAudio: true };
    }),
}));

export const useNotInputFocus = create<focusState & focusStateAction>(
  (set) => ({
    isInputFocus: false,
    setIsInputFocus: (value: boolean) => set(() => ({ isInputFocus: value })),
  }),
);

export const usePlaylistFolder = create<
  playlistFolderProps & setPlaylistFolderAction & addPlaylistFolderAction
>((set) => ({
  playlistFolder: null,
  setPlaylistFolder: (value) =>
    set((state) => {
      // If there's no existing state yet, just set the new value
      if (!state.playlistFolder) {
        return { playlistFolder: value };
      }
      return { playlistFolder: state.playlistFolder };
    }),
  addPlaylistFolder: (value) =>
    set((state) => ({
      playlistFolder: [...(state.playlistFolder || []), value],
    })),
}));

// only for trigger
export const useSongsStoreData = create<addSongProps & addSongAction>(
  (set) => ({
    addSong: {},
    addSongAction: (value) =>
      set(() => {
        return {
          addSong: { ...value },
        };
      }),
  }),
);

import outputCurrentIndex from "./OutputCurrentIndex";
import { excludeCurrentSongsList } from "./excludeCurrentSongs";
import { NormalizedById } from "./returnById";

export interface songExist {
  playlistId: string;
  songId: string;
}
export interface isSongExist {
  isSongExist: songExist | object;
}
export interface songExistAction {
  setIsSongExist: (songExist: isSongExist["isSongExist"]) => void;
}
export const useIsExistSongs = create<isSongExist & songExistAction>((set) => ({
  isSongExist: {},
  setIsSongExist: (value) =>
    set(() => ({
      isSongExist: value,
    })),
}));

export interface addSongsToPlaylistProps {
  songId: string;
  cover_url: string;
}
export interface songsToPlaylist {
  songsToPlaylist: addSongsToPlaylistProps | object;
}
export interface addSongsToPlaylist {
  addSongsToPlaylist: (value: addSongsToPlaylistProps | object) => void;
}
export const useAddSongsToPlaylist = create<
  songsToPlaylist & addSongsToPlaylist
>((set) => ({
  songsToPlaylist: {},
  addSongsToPlaylist: (value) =>
    set(() => ({
      songsToPlaylist: value,
    })),
}));

export interface editToPlaylistProps {
  id: string;
  name: string;
}
export interface editToPlaylist {
  editToPlaylist: editToPlaylistProps | object;
}
export interface editToPlaylistAction {
  editToPlaylistAction: (value: editToPlaylist["editToPlaylist"]) => void;
}
export const useEditToPlaylist = create<editToPlaylist & editToPlaylistAction>(
  (set) => ({
    editToPlaylist: {},
    editToPlaylistAction: (value) =>
      set(() => ({
        editToPlaylist: value,
      })),
  }),
);
export interface ShowBlock {
  showBlock: { type: "lyric" | "queue" | undefined; open: boolean };
}
export interface ShowBlockAction {
  setShowBlock: (value: ShowBlock["showBlock"]["type"]) => void;
}

export const useShowBlock = create<ShowBlock & ShowBlockAction>((set) => ({
  showBlock: {
    type: undefined,
    open: false,
  },
  setShowBlock: (value) =>
    set((state) => {
      if (value !== undefined) {
        if (state.showBlock.type === value) {
          return {
            showBlock: {
              type: value,
              open: !state.showBlock.open,
            },
          };
        } else {
          return {
            showBlock: {
              type: value,
              open: true,
            },
          };
        }
      }
      return { showBlock: { type: undefined, open: false } };
    }),
}));

export interface SongTrackState {
  songTrack:
    | {
        count: number;
        songsId: string[];
      }
    | undefined;
}
export interface SetSongTrackAction {
  setSongTrack: (songId: string) => void;
}
export const useSongTrack = create<SongTrackState & SetSongTrackAction>()(
  persist(
    (set) => ({
      songTrack: undefined,

      setSongTrack: (songId) =>
        set((state) => {
          if (!songId) return state;

          if (!state.songTrack) {
            return {
              songTrack: {
                count: 0,
                songsId: [songId],
              },
            };
          }

          if (state.songTrack.count >= 5) {
            return {
              songTrack: { count: 1, songsId: [songId] },
            };
          }

          if (state.songTrack.songsId.includes(songId)) {
            return {
              songTrack: {
                count: state.songTrack.count + 1,
                songsId: state.songTrack.songsId,
              },
            };
          }

          return {
            songTrack: {
              count: state.songTrack.count + 1,
              songsId: [...state.songTrack.songsId, songId],
            },
          };
        }),
    }),
    {
      name: "track-song-storage",
    },
  ),
);

export interface listTrackState {
  listTrack:
    | {
        type: "playlist" | "album" | "artist";
        id: string;
      }
    | undefined;
}
export interface SetListTrackAction {
  setListTrack: (type: "playlist" | "album" | "artist", id: string) => void;
}
export const useListTrack = create<listTrackState & SetListTrackAction>(
  (set) => ({
    listTrack: undefined,
    setListTrack: (type, id) =>
      set((state) => {
        if (!id) return state;
        return {
          listTrack: {
            type,
            id,
          },
        };
      }),
  }),
);

export interface likeActionState {
  likeAction: Record<string, boolean>;
}
export interface setLikeAction {
  setLikeAction: (value: likeActionState["likeAction"]) => void;
}
export const useLikeActionStore = create<likeActionState & setLikeAction>(
  (set) => ({
    likeAction: {},
    setLikeAction: (value) =>
      set(() => ({
        likeAction: value,
      })),
  }),
);
