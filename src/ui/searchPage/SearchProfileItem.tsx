import ContextSongListContainer from "../playlist/playlistOption/ContextSongListContainer";
import MoreOption from "../trackComponent/MoreOption";
import MoreOptionContext from "../trackComponent/MoreOptionContext";
import LeadingRelax from "../general/LeadingRelax";
import Image from "next/image";
import SearchItemWrapper from "./SearchItemWrapper";
import ProfileOption from "../general/optionBox/ProfileOption";
import IconWrapper from "../general/IconWrapper";
import { User } from "lucide-react";
import VerticalThreeDots from "../general/icon/VerticalThreeDots";
import type { listInfo } from "../../../database.types-fest";

interface SearchProfileItemProps {
  description: string;
  index: number;
  Itemdata: listInfo;
}
function SearchProfileItem({
  description,
  index,
  Itemdata,
}: SearchProfileItemProps) {
  const { id, name, cover_url } = Itemdata;
  return (
    <SearchItemWrapper>
      <div className="w-[50px]  relative group  ">
        <div className="size-[50px] rounded-full overflow-hidden relative bg-[#333333] group-hover:bg-[#222222]">
          {cover_url ? (
            <Image src={cover_url} fill alt="img" sizes="50px" />
          ) : (
            <div className=" absolute inset-0 flex items-center justify-center">
              <IconWrapper
                Icon={User}
                className="hover:scale-100   active:scale-100 size-[30px]"
              />
            </div>
          )}
        </div>
      </div>
      <div className="min-w-0 flex-1  p-2">
        <div className="truncate text-sm">
          <LeadingRelax>{name}</LeadingRelax>
        </div>
      </div>
      <div className=" flex item-center">
        <ContextSongListContainer id={id} list={Itemdata}>
          <MoreOptionContext relative={undefined}>
            <MoreOption
              targetElement={<ProfileOption />}
              triggerEl={<VerticalThreeDots />}
            />
          </MoreOptionContext>
        </ContextSongListContainer>
      </div>
    </SearchItemWrapper>
  );
}

export default SearchProfileItem;
