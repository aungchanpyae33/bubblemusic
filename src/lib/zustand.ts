import type { Artist, SongInfo } from "../../database.types-fest";
import type { ListSongPage } from "@/database/data-types-return";
import { RefObject } from "react";
import { createWithEqualityFn as create } from "zustand/traditional";
import { persist } from "zustand/middleware";

export interface SongDetail {
  url: string;
  duration: number;
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

interface SignInModalBoxProps {
  originParentTriggerRef?: originParentTriggerRef;
}
export interface SignInModalBox {
  signInModalBox: SignInModalBoxProps | undefined;
}
export interface SignInModalBoxAction {
  signInModalBoxAction: (value: SignInModalBox["signInModalBox"]) => void;
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
export const useSong = create<SongState & SongActions>()((set) => ({
  songCu: {},
  updateSongCu: (newSong) =>
    set(() => ({
      songCu: { ...newSong },
    })),
}));

export const usePreviousPlayList = create<
  previousSongPlaylist & previousSongPlaylistAction
>()((set) => ({
  previousPlayListArray: {},
  setPreviousPlayListArray: (newList) =>
    set(() => {
      return { previousPlayListArray: { ...newList } };
    }),
}));

export const useSongFunction = create<SongFunctionState & SongFunctionActions>(
  (set) => ({
    Isplay: {},
    setPlay: (key, play) =>
      set((state) => {
        if (key === "close") return { Isplay: {} };
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
  StorePlayListIdState & StorePlayListIdStateAction
>()((set) => ({
  playlistId: {},
  setPlaylistId: (id) =>
    set(() => ({
      playlistId: { ...id },
    })),
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
      if (key === "close") return { IsPlayList: {} };
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
    RepeatAction
>()((set) => ({
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

export const useSignInModalBox = create<SignInModalBox & SignInModalBoxAction>(
  (set) => ({
    signInModalBox: undefined,
    signInModalBoxAction: (newState) =>
      set(() => ({
        signInModalBox: newState,
      })),
  }),
);

export const useVolumeValue = create<
  VolumeValueState & VolumeValueActions & resetAction
>()(
  persist(
    (set) => ({
      value: 0,
      setValue: (newValue: number) =>
        set(() => ({
          value: newValue,
        })),
      reset: () => {
        set(() => ({
          value: 0,
        }));
      },
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
  setIsFallBackAudio: (boolean: boolean) => void;
}

export const useInstantFallBackAudioFull = create<
  isFallBackAudioState & isFallBackAudioActions
>((set) => ({
  isFallBackAudio: false,
  setIsFallBackAudio: (value: boolean) =>
    set(() => {
      return { isFallBackAudio: value };
    }),
}));

export const useNotInputFocus = create<focusState & focusStateAction>(
  (set) => ({
    isInputFocus: false,
    setIsInputFocus: (value: boolean) => set(() => ({ isInputFocus: value })),
  }),
);

import outputCurrentIndex from "./OutputCurrentIndex";
import { NormalizedById } from "./returnById";

export interface noticeModalBoxProps {
  noticeText: string;
  originParentTriggerRef?: originParentTriggerRef;
}

export interface noticeModalBox {
  noticeModalBox: noticeModalBoxProps | undefined;
}

export interface noticeModalBoxAction {
  noticeModalBoxAction: (value: noticeModalBox["noticeModalBox"]) => void;
}

export const useNoticeModalBox = create<noticeModalBox & noticeModalBoxAction>(
  (set) => ({
    noticeModalBox: undefined,
    noticeModalBoxAction: (value) =>
      set(() => ({
        noticeModalBox: value,
      })),
  }),
);
export interface isSongExistModalBoxProps {
  playlistId: string;
  songId: string;
  cover_url: string;
  originParentTriggerRef?: originParentTriggerRef;
}
export interface isSongExistModalBox {
  isSongExistModalBox: isSongExistModalBoxProps | undefined;
}
export interface songExistActionModalBox {
  setIsSongExistModalBox: (
    songExist: isSongExistModalBox["isSongExistModalBox"],
  ) => void;
}
export const useIsExistSongsModalBox = create<
  isSongExistModalBox & songExistActionModalBox
>((set) => ({
  isSongExistModalBox: undefined,
  setIsSongExistModalBox: (value) =>
    set(() => ({
      isSongExistModalBox: value,
    })),
}));

export interface songsToPlaylistModalBoxProps {
  songId: string;
  cover_url: string;
  originParentTriggerRef?: originParentTriggerRef;
}
export interface songsToPlaylistModalBox {
  songsToPlaylistModalBox: songsToPlaylistModalBoxProps | undefined;
}
export interface addSongsToPlaylistModalBox {
  addSongsToPlaylistModalBox: (
    value: songsToPlaylistModalBox["songsToPlaylistModalBox"],
  ) => void;
}
export const useAddSongsToPlaylistModalBox = create<
  songsToPlaylistModalBox & addSongsToPlaylistModalBox
>((set) => ({
  songsToPlaylistModalBox: undefined,
  addSongsToPlaylistModalBox: (value) =>
    set(() => ({
      songsToPlaylistModalBox: value,
    })),
}));

export type originParentTriggerRef = RefObject<HTMLElement | null> | undefined;
export interface editToPlaylistModalBoxProps {
  id: string;
  name: string;
  originParentTriggerRef?: originParentTriggerRef;
}
export interface editToPlaylistModalBox {
  editToPlaylistModalBox: editToPlaylistModalBoxProps | undefined;
}
export interface editToPlaylistModalBoxAction {
  editToPlaylistModalBoxAction: (
    value: editToPlaylistModalBox["editToPlaylistModalBox"],
  ) => void;
}
export const useEditToPlaylist = create<
  editToPlaylistModalBox & editToPlaylistModalBoxAction
>((set) => ({
  editToPlaylistModalBox: undefined,
  editToPlaylistModalBoxAction: (value) =>
    set(() => ({
      editToPlaylistModalBox: value,
    })),
}));

export interface createToPlaylistModalBoxProps {
  originParentTriggerRef?: originParentTriggerRef;
}

export interface createToPlaylistModalBox {
  createToPlaylistModalBox: createToPlaylistModalBoxProps | undefined;
}

export interface createToPlaylistModalBoxAction {
  createToPlaylistModalBoxAction: (
    value: createToPlaylistModalBox["createToPlaylistModalBox"],
  ) => void;
}

export const useCreateToPlaylist = create<
  createToPlaylistModalBox & createToPlaylistModalBoxAction
>((set) => ({
  createToPlaylistModalBox: undefined,
  createToPlaylistModalBoxAction: (value) =>
    set(() => ({
      createToPlaylistModalBox: value,
    })),
}));

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
export const useSongTrack = create<
  SongTrackState & SetSongTrackAction & resetAction
>()(
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

      reset: () => {
        set(() => ({
          songTrack: undefined,
        }));
      },
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
