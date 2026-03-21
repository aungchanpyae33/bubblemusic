import SearchContainer from "../SearchContainer";
import UnderLineLinkHover from "@/ui/general/UnderLineLinkHover";
import type { GetSearchPage } from "@/database/data-types-return";
import { getTranslations } from "next-intl/server";
import ListImage from "@/ui/ListContainer/ListImage";
import ListUpperName from "@/ui/ListContainer/ListUpperName";
import InfoSong from "@/ui/general/ListInfoGeneral/InfoSong";
import InfoList from "@/ui/general/ListInfoGeneral/InfoList";

async function TopResult({
  topResult,
}: {
  topResult: GetSearchPage["top_result"];
}) {
  const l = await getTranslations("ListTitle");
  if (!topResult) return;
  return (
    <SearchContainer className="bg-section">
      <div className=" max-w-[700px] p-2   flex flex-col  gap-4 rounded-lg ">
        <h1 className=" text-xl font-bold ">{l("topResult")}</h1>
        <div className=" flex items-center gap-5">
          <ListImage
            type={topResult.type}
            cover_url={topResult.cover_url}
            name={topResult.name}
            className=" w-[130px] md:w-[150px] lg:w-[170px]"
          />
          <ListUpperName>
            {topResult.type !== "track" ? (
              <UnderLineLinkHover href={`${topResult.type}/${topResult.id}`}>
                {topResult.name}
              </UnderLineLinkHover>
            ) : (
              <UnderLineLinkHover
                href={`${topResult.type}/${topResult.song_id}`}
              >
                {topResult.name}
              </UnderLineLinkHover>
            )}
          </ListUpperName>
        </div>
        <div className=" flex items-center">
          <span className=" border text-base lg:text-lg font-medium p-1 mr-2">
            {l(topResult.type)}
          </span>
          {topResult.type === "track" && <InfoSong songInfo={topResult} />}
          {topResult.type !== "track" && (
            <InfoList
              type={topResult.type}
              related_id={topResult.related_id}
              related_name={topResult.related_name}
              is_official={topResult.is_official}
            />
          )}
        </div>
      </div>
    </SearchContainer>
  );
}

export default TopResult;
