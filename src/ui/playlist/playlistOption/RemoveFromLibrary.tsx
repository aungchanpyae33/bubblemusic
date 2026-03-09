import OptionItem from "@/ui/general/optionBox/OptionItem";
import OptionButton from "@/ui/general/optionBox/OptionButton";
import OptionIconEl from "@/ui/general/optionBox/OptionIconEl";
import IconWrapper from "@/ui/general/IconWrapper";
import { BookmarkX } from "lucide-react";
import { removeFromLibrary } from "@/actions/removeFromLibrary";
import { useSongListContext } from "./ContextSongListContainer";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import OptionText from "@/ui/general/optionBox/OptionText";
import type { GetRecent } from "@/database/data-types-return";

function RemoveFromLibraryChild() {
  const b = useTranslations("block");
  const router = useRouter();
  const { id, source } = useSongListContext();
  const queryClient = useQueryClient();
  async function removeFromLibraryFn() {
    const { data, error } = await removeFromLibrary(
      id,
      source as "create" | "reference",
    );

    if (error) {
      console.log("something wrong", error);
    } else {
      if (data) {
        if (source === "create") {
          const currentRecentData = queryClient.getQueryData<GetRecent>([
            "recentlyPlayed",
          ]);
          if (currentRecentData) {
            const removeId = id;

            // Check existence first
            const exists = currentRecentData.byId[removeId];

            if (exists) {
              const updatedRecentData = {
                ...currentRecentData,
                byId: { ...currentRecentData.byId },
                idArray: currentRecentData.idArray.filter(
                  (itemId) => itemId !== removeId,
                ),
              };

              delete updatedRecentData.byId[removeId];

              queryClient.setQueryData(["recentlyPlayed"], updatedRecentData);
            }
          }
        }
        queryClient.setQueryData(["user-library"], {
          data,
          error: null,
        });

        if (source === "create") {
          router.push("/");
        }
      }
    }
  }
  return (
    <OptionItem>
      <OptionButton action={removeFromLibraryFn}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={BookmarkX} />
        </OptionIconEl>
        <OptionText>{b("removeFromLibrary")}</OptionText>
      </OptionButton>
    </OptionItem>
  );
}

function RemoveFromLibrary() {
  const { source } = useSongListContext();
  if (source === "none") return null;
  return <RemoveFromLibraryChild />;
}

export default RemoveFromLibrary;
