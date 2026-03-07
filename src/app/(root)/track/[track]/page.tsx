import { getSongTrack } from "@/database/data";
import AlbumUpperContainer from "@/ui/albumContainer/AlbumUpperContainer";
import AudiosContainer from "@/ui/albumContainer/AudiosContainer";
import VerticalThreeDots from "@/ui/general/icon/VerticalThreeDots";
import ListContainer from "@/ui/general/ListContainerOption/ListContainer";
import ListContainerPlayBack from "@/ui/general/ListContainerOption/ListContainerPlayBack";
import ContextInfoTrack from "@/ui/trackComponent/ContextInfoTrack";
import ContextLike from "@/ui/trackComponent/ContextLike";
import MoreOption from "@/ui/trackComponent/MoreOption";
import MoreOptionContext from "@/ui/trackComponent/MoreOptionContext";
import TrackItemContainer from "@/ui/trackComponent/TrackItemContainer";
import TrackToggleLike from "@/ui/trackComponent/TrackToggleLike";

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
      <AlbumUpperContainer songs={songs} />
      <ContextInfoTrack id={songsInfo?.id} source={undefined} song={songsInfo}>
        <ContextLike id={songsInfo!.song_id}>
          <ListContainer>
            <ListContainerPlayBack list={songs} />
            <TrackToggleLike songId={songsInfo!.song_id} />
            <div>
              <MoreOptionContext relative={songsInfo.artists}>
                <MoreOption
                  targetElement={<TrackItemContainer />}
                  triggerEl={<VerticalThreeDots />}
                />
              </MoreOptionContext>
            </div>
          </ListContainer>
        </ContextLike>
      </ContextInfoTrack>

      <AudiosContainer description="track" listSong={songs} />
    </div>
  );
}

export default page;
