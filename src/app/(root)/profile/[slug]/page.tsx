import VerticalThreeDots from "@/ui/general/ThreeDot/VerticalThreeDots";
import ListContainer from "@/ui/general/ListContainerOption/ListContainer";
import ListUpperWrapper from "@/ui/ListContainer/ListUpperWrapper";
import ListUpFaceGroup from "@/ui/ListUpFaceContainer/ListUpFaceGroup";
import ContextSongListContainer from "@/Context/ContextSongListContainer";
import ContextMoreOption from "@/Context/ContextMoreOption";
import ProfileOption from "@/ui/Option/ProfileOption/ProfileOption";
import MoreOption from "@/ui/general/MoreOption/MoreOption";
import { notFound } from "next/navigation";
import { cacheCheckExist, cacheGetUserPage } from "@/database/data-cache";
import { getTranslations } from "next-intl/server";
import { outputBaseUrl } from "@/lib/outputBaseUrl";
import type { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const meta = await getTranslations("MetaData");

  const params = await props.params;
  const { exists, error: checkExistError } = await cacheCheckExist(
    "profile",
    params.slug,
  );

  if (checkExistError) throw new Error("page-load-error");
  if (!exists) notFound();

  const { data, error } = await cacheGetUserPage(params.slug);
  if (!data || error) throw new Error("page-load-error");

  const { profile } = data;
  if (!profile) throw new Error("page-load-error");

  return {
    title: meta("profilePage.title", { name: data.profile.name }),
    description: meta("profilePage.description", { name: data.profile.name }),
    metadataBase: outputBaseUrl(),
    openGraph: {
      url: `/profile/${params.slug}`,
      type: "profile",
    },
  };
}

async function page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { exists, error: checkExistError } = await cacheCheckExist(
    "profile",
    params.slug,
  );
  if (checkExistError) throw new Error("page-load-error");
  if (!exists) notFound();

  const { data, error } = await cacheGetUserPage(params.slug);
  if (!data || error) throw new Error("page-load-error");

  const { playlists, profile } = data;

  if (!profile) throw new Error("page-load-error");
  return (
    <div className=" w-full">
      <ListUpperWrapper list={profile} />
      <ListContainer>
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
        <ListUpFaceGroup
          showMore={true}
          href={`/profile/${params.slug}/playlists`}
          list={playlists}
          description="publicPlaylist"
        />
      )}
    </div>
  );
}

export default page;
