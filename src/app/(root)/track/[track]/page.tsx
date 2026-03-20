import { getSongTrack } from "@/database/data";
import VerticalThreeDots from "@/ui/general/ThreeDot/VerticalThreeDots";
import ListContainer from "@/ui/general/ListContainerOption/ListContainer";
import ListContainerPlayBack from "@/ui/general/ListContainerOption/ListContainerPlayBack";
import ListUpperWrapper from "@/ui/ListContainer/ListUpperWrapper";
import MoreOption from "@/ui/trackComponent/MoreOption";
import TrackItemContainer from "@/ui/trackComponent/TrackItemContainer";
import TrackToggleLike from "@/ui/trackComponent/TrackToggleLike";
import PageTrackItemContainer from "@/ui/albumContainer/PageTrackItemContainer";
import ContextInfoTrack from "@/Context/ContextInfoTrack";
import ContextLike from "@/Context/ContextLike";
import ContextMoreOption from "@/Context/ContextMoreOption";

// import PlaceHolderTrackInstantPlay from "@/ui/Footer/PlaceHolderTrackInstantPlay";

async function page(props: { params: Promise<{ track: string }> }) {
  const { track } = await props.params;
  const { data, error } = await getSongTrack(track);

  if (!data || error) return;
  const { songs } = data;
  if (!songs) return;
  if (!songs.songs) return;

  const songsInfo = songs.songs.byId[track];

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

      <PageTrackItemContainer description="track" listSong={songs} />
    </div>
  );
}

export default page;
