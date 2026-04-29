import UnderLineLinkHover from "./UnderLineLinkHover";
import ToolTip from "./ToolTip";
import { twMerge } from "tailwind-merge";
import type { Artist } from "../../../database.types-fest";
const baseStyle = " text-sm truncate";
interface ArtistWrapperProps extends React.ComponentProps<"div"> {
  artists: Artist[];
}
function ArtistWrapper({ artists, className }: ArtistWrapperProps) {
  const text = artists.map((item) => item.name).join(",");
  return (
    <div className={twMerge(baseStyle, className)}>
      <ToolTip tooltipContent={text}>
        {artists.map((item, index) => (
          <span key={item.id} className=" w-full">
            <UnderLineLinkHover
              href={`/artist/${item.id}`}
              className="mr-1 inline"
            >
              {item.name}
              {index < artists.length - 1 && ","}
            </UnderLineLinkHover>
          </span>
        ))}
      </ToolTip>
    </div>
  );
}

export default ArtistWrapper;
