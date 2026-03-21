import {
  useDirectPlayBack,
  useSongFunction,
  // useStorePlayListId,
} from "@/lib/zustand";
import type {
  SongFunctionState,
  SongFunctionActions,
  DirectPlayBackAction,
} from "@/lib/zustand";
import { Pause, Play } from "lucide-react";
import IconWrapper from "@/ui/general/IconWrapper";

type Props = React.ComponentProps<"button">;
function ToggleButton({ className }: Props) {
  const Isplay = useSongFunction(
    (state: SongFunctionState) => Object.values(state.Isplay)[0],
  );

  const setPlay = useSongFunction(
    (state: SongFunctionActions) => state.setPlay,
  );
  const setPlayList = useDirectPlayBack(
    (state: DirectPlayBackAction) => state.setPlayList,
  );

  return (
    <button
      className={className}
      id="play-icon"
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
      onClick={() => {
        // toggle
        setPlay("toggle_key", undefined);
        setPlayList("toggle_key", undefined);
      }}
    >
      {Isplay ? (
        <IconWrapper size="large" Icon={Pause} />
      ) : (
        <IconWrapper size="large" Icon={Play} />
      )}
    </button>
  );
}

export default ToggleButton;
