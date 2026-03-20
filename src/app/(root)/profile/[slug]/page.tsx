import { getUserPage } from "@/database/data";
import VerticalThreeDots from "@/ui/general/ThreeDot/VerticalThreeDots";
import ListContainer from "@/ui/general/ListContainerOption/ListContainer";
import ProfileOption from "@/ui/general/optionBox/ProfileOption";
import ListUpperWrapper from "@/ui/ListContainer/ListUpperWrapper";
import ListUpFaceGroup from "@/ui/ListUpFaceContainer/ListUpFaceGroup";
import MoreOption from "@/ui/trackComponent/MoreOption";
import ContextSongListContainer from "@/Context/ContextSongListContainer";
import ContextMoreOption from "@/Context/ContextMoreOption";
async function page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  const { data, error } = await getUserPage(params.slug);
  if (!data || error) return;

  const { playlists, profile } = data;

  if (!playlists || !profile) return;
  return (
    <div className=" w-full">
      <ListUpperWrapper list={profile} />
      <ListContainer className="h-[50px]">
        <div>
          <ContextSongListContainer id={profile.id} list={profile}>
            <ContextMoreOption>
              <MoreOption
                targetElement={<ProfileOption />}
                triggerEl={<VerticalThreeDots />}
              />
            </ContextMoreOption>
          </ContextSongListContainer>
        </div>
      </ListContainer>

      {playlists && (
        <ListUpFaceGroup list={playlists} description="publicPlaylist" />
      )}
    </div>
  );
}

export default page;
