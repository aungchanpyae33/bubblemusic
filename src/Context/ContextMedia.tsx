import { createContext, useContext } from "react";
import { ReactNode } from "react";
import type { Artist } from "../../database.types-fest";
export interface DataContextProps {
  duration: number;
  song_id: string;
  id: string;
  is_lyric: boolean;
  name: string;
  artists: Artist[];
  cover_url: string;
}

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
