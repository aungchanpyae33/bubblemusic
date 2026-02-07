"use client";
import { BookmarkPlus, BookmarkX } from "lucide-react";
import IconWrapper from "../IconWrapper";
import { addToLibrary } from "@/actions/AddToLibrary";
import { Database } from "../../../../database.types";
import { useContext, useEffect, useState } from "react";
import { removeFromLibrary } from "@/actions/removeFromLibrary";
import { useQueryClient } from "@tanstack/react-query";
import {
  SongListContext,
  SongListValue,
} from "@/ui/playlist/playlistOption/ContextSongListContainer";
import { useRouter } from "nextjs-toploader/app";
import { useTopLoader } from "nextjs-toploader";

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
  const { id, type, source } = useContext(SongListContext) as SongListValue;

  const router = useRouter();
  const loader = useTopLoader();
  const queryClient = useQueryClient();
  const [itemSource, setItemSource] = useState(isAdd(source));
  useEffect(() => {
    setItemSource(isAdd(source));
  }, [source]);
  async function ActionToLibraryFn() {
    loader.start();
    setItemSource(!itemSource);
    const { data, error } = await modifyLib({ id, type, source });
    if (error) {
      loader.done();
    } else {
      if (data) {
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
        <IconWrapper
          size="exLarge"
          Icon={BookmarkX}
          className=" fill-brand"
        />
      )}
    </button>
  );
}
export default ListContainerAddToLibrary;
