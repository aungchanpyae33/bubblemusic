import { createContext, RefObject, useContext } from "react";
export interface DataContextProps {
  duration: number;
  abortController: RefObject<AbortController | null>;
  fetching: RefObject<{ isFetch: boolean; fetchingseg: number }>;
  loadNextSegment: React.RefObject<(() => Promise<void>) | null>;
  segNum: RefObject<number>;
  sege: number | undefined;
  song_time_stamp: Array<number>;
  bufferThreshold: number;
  song_id: string;
  id: string;
  is_lyric: boolean;
  name: string;
  artists: Artist[];
  cover_url: string;
}

import { ReactNode } from "react";
import type { Artist } from "../../../database.types-fest";

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error(
      "useDataContext must be used within a DataContext.Provider",
    );
  }
  return context;
};
function ContextMedia({
  children,
  data,
}: {
  children: ReactNode;
  data: DataContextProps;
}) {
  const value = { ...data };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default ContextMedia;
