"use client";
import { BookmarkPlus, BookmarkX } from "lucide-react";
import IconWrapper from "../IconWrapper";
import { addToLibrary } from "@/actions/AddToLibrary";
import { Database } from "../../../../database.types";
import { useEffect, useState } from "react";
import { removeFromLibrary } from "@/actions/removeFromLibrary";
import { useQueryClient } from "@tanstack/react-query";
import {
  useSongListContext,
} from "@/ui/playlist/playlistOption/ContextSongListContainer";
import { useRouter } from "nextjs-toploader/app";
import { useTopLoader } from "nextjs-toploader";
import type { GetRecent } from "@/database/data-types-return";

interface ListContainerAddToLibraryProps {
  id: string;
  type: Database["public"]["Enums"]["media_item_type"];
  source: Database["public"]["Enums"]["media_source_type"];
}

async function modifyLib({ id, type, source }: ListContainerAddToLibraryProps) {
  if (source === "create" || source === "reference") {
    return await removeFromLibrary(id, source);
  } else {
    return await addToLibrary(id, type);
  }
}

function isAdd(source: Database["public"]["Enums"]["media_source_type"]) {
  if (source === "create" || source === "reference") {
    return false;
  } else {
    return true;
  }
}

function ListContainerAddToLibrary() {
  const { id, type, source } = useSongListContext();
  const router = useRouter();
  const loader = useTopLoader();
  const queryClient = useQueryClient();
  const [itemSource, setItemSource] = useState(isAdd(source));
  useEffect(() => {
    setItemSource(isAdd(source));
  }, [source]);
  async function ActionToLibraryFn() {
    loader.start();
    setItemSource(itemSource);
    const { data, error } = await modifyLib({ id, type, source });
    if (error) {
      loader.done();
    } else {
      if (data) {
        if (source === "create") {
          const currentRecentData = queryClient.getQueryData<GetRecent>([
            "recentlyPlayed",
          ]);
          if (currentRecentData) {
            const removeId = id;

            // Check existence first
            const exists = currentRecentData.byId[removeId];

            if (exists) {
              const updatedRecentData = {
                ...currentRecentData,
                byId: { ...currentRecentData.byId },
                idArray: currentRecentData.idArray.filter(
                  (itemId) => itemId !== removeId,
                ),
              };

              delete updatedRecentData.byId[removeId];

              queryClient.setQueryData(["recentlyPlayed"], updatedRecentData);
            }
          }
        }
        queryClient.setQueryData(["user-library"], {
          data,
          error: null,
        });
        loader.done();
      }
      if (source === "create") {
        router.push("/");
      }
    }
  }
  return (
    <button onClick={ActionToLibraryFn}>
      {itemSource ? (
        <IconWrapper size="exLarge" Icon={BookmarkPlus} className="" />
      ) : (
        <IconWrapper size="exLarge" Icon={BookmarkX} className=" fill-brand" />
      )}
    </button>
  );
}
export default ListContainerAddToLibrary;
