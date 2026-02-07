import { useContext } from "react";
import OptionItem from "@/ui/general/optionBox/OptionItem";
import OptionButton from "@/ui/general/optionBox/OptionButton";
import OptionIconEl from "@/ui/general/optionBox/OptionIconEl";
import IconWrapper from "@/ui/general/IconWrapper";
import { BookmarkPlus } from "lucide-react";

import { addToLibrary } from "@/actions/AddToLibrary";
import { useQueryClient } from "@tanstack/react-query";
import {
  SongListContext,
  SongListValue,
} from "@/ui/playlist/playlistOption/ContextSongListContainer";

function AddToLibraryChild() {
  const { id, type } = useContext(SongListContext) as SongListValue;

  const queryClient = useQueryClient();
  async function addToLibraryFn() {
    const { data, error } = await addToLibrary(id, type);
    if (error) {
      console.log(error);
    } else {
      if (data) {
        queryClient.setQueryData(["user-library"], {
          data,
          error: null,
        });
      }
    }
  }
  return (
    <OptionItem>
      <OptionButton action={addToLibraryFn}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={BookmarkPlus} />
        </OptionIconEl>
        <span>Add to the library</span>
      </OptionButton>
    </OptionItem>
  );
}

function AddToLibrary() {
  const { source } = useContext(SongListContext) as SongListValue;

  if (source !== "none") return null;
  return <AddToLibraryChild />;
}

export default AddToLibrary;
