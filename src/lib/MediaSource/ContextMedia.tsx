import { createContext, RefObject } from "react";
export interface prop {
  duration: number;
  abortController: RefObject<AbortController | null>;
  fetching: RefObject<{ isFetch: boolean; fetchingseg: number }>;
  loadNextSegment: React.RefObject<(() => Promise<void>) | null>;
  segNum: RefObject<number>;
  sege: number | undefined;
  song_time_stamp: Array<number>;
  bufferThreshold: number;
  song_id: string;
  is_lyric: boolean;
  name: string;
  artists: Artist[];
  cover_url: string;
}

import { ReactNode } from "react";
import type { Artist } from "../../../database.types-fest";

export const DataContext = createContext<prop>({
  duration: 0,
  abortController: { current: null },
  fetching: { current: { isFetch: false, fetchingseg: 1 } },
  segNum: { current: 1 },
  song_time_stamp: [],
  loadNextSegment: { current: async () => {} },
  sege: undefined,
  bufferThreshold: 0,
  song_id: "",
  is_lyric: false,
  name: "",
  artists: [],
  cover_url: "",
});
function ContextMedia({ children, data }: { children: ReactNode; data: prop }) {
  const value = { ...data };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default ContextMedia;
