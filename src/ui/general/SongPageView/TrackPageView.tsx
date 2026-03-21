import ContextInfoTrack from "@/Context/ContextInfoTrack";
import ContextLike from "@/Context/ContextLike";
import ListUpperWrapper from "@/ui/ListContainer/ListUpperWrapper";
import ListContainer from "../ListContainerOption/ListContainer";
import ListContainerPlayBack from "../ListContainerOption/ListContainerPlayBack";
import TrackToggleLike from "@/ui/Track/TrackToggleLike";
import ContextMoreOption from "@/Context/ContextMoreOption";
import MoreOption from "../MoreOption/MoreOption";
import VerticalThreeDots from "../ThreeDot/VerticalThreeDots";
import TrackItemContainer from "@/ui/Option/TrackOption/TrackItemContainer";
import type { ListSongPage } from "@/database/data-types-return";
import { ReactNode } from "react";
import type { SongInfo } from "../../../../database.types-fest";

function TrackPageView({
  songs,
  songsInfo,
  children,
}: {
  songs: ListSongPage;
  songsInfo: SongInfo;
  children: ReactNode;
}) {
  return (
    <div className=" w-full">
      <ListUpperWrapper list={songs} />
      <ContextInfoTrack song={songsInfo}>
        <ContextLike id={songsInfo.song_id}>
          <ListContainer>
            <ListContainerPlayBack list={songs} />
            <TrackToggleLike songId={songsInfo.song_id} />
            <div>
              <ContextMoreOption
                relative={songsInfo.artists}
                type={songsInfo.type}
              >
                <MoreOption
                  targetElement={<TrackItemContainer />}
                  triggerEl={<VerticalThreeDots />}
                />
              </ContextMoreOption>
            </div>
          </ListContainer>
        </ContextLike>
      </ContextInfoTrack>

      {children}
    </div>
  );
}

export default TrackPageView;
