"use client";

import { getUserLibClient } from "@/database/client-data";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import type { NavbarList } from "@/database/data-types-return";
import { NormalizedById } from "@/lib/returnById";
import type { SongInfo } from "../../database.types-fest";

interface songContext {
  song: SongInfo | undefined;
}

interface InfoTrackContextProps extends songContext {
  id?: string;
  source?: "create" | "reference" | "none";
}

const InfoTrackContext = createContext<InfoTrackContextProps | undefined>(
  undefined,
);

export const useInfoTrackContext = () => {
  const context = useContext(InfoTrackContext);
  if (context === undefined) {
    throw new Error(
      "useInfoTrackContext must be used within a InfoTrackContext.Provider",
    );
  }
  return context;
};

function getSourceType(
  userLib: NormalizedById<NavbarList>,
  inPage: boolean | undefined,
  id: string | undefined,
) {
  if (inPage) {
    const { source } = userLib.byId[id || ""] ?? { source: "none" };
    return source;
  }
  return undefined;
}
//source is optional and it is only required when we want to remove songs from library in Page like playlist page
function ContextInfoTrack({
  children,
  id,
  inPage,
  song,
}: {
  children: React.ReactNode;
  id?: string;
  inPage?: boolean;
  song: SongInfo | undefined;
}) {
  const { data: queryData, error: queryError } = useQuery({
    queryKey: ["user-library"],
    queryFn: () => getUserLibClient(),
  });
  if (!queryData || queryError) return;
  const { data, error } = queryData || {};
  if (error instanceof Error) {
    if (error.name === "custom_auth_error") {
      const source: "none" | undefined = inPage ? "none" : undefined;
      const value = { id, song, source };
      return (
        <InfoTrackContext.Provider value={value}>
          {children}
        </InfoTrackContext.Provider>
      );
    }
  }
  if (!data || error) return;
  const { userLib } = data;
  if (!userLib) return;
  const sourceType = getSourceType(userLib, inPage, id);
  const value = { id, song, source: sourceType };
  return (
    <InfoTrackContext.Provider value={value}>
      {children}
    </InfoTrackContext.Provider>
  );
}

export default ContextInfoTrack;
