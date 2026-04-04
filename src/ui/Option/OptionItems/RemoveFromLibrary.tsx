import IconWrapper from "@/ui/general/IconWrapper";
import { BookmarkX } from "lucide-react";
import { removeFromLibrary } from "@/actions/removeFromLibrary";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import type { GetRecent } from "@/database/data-types-return";
import { useSongListContext } from "@/Context/ContextSongListContainer";
import OptionItem from "../OptionUI/OptionItem";
import OptionButton from "../OptionUI/OptionButton";
import OptionIconEl from "../OptionUI/OptionIconEl";
import OptionText from "../OptionUI/OptionText";
import { toast } from "sonner";

function RemoveFromLibraryChild() {
  const b = useTranslations("block");
  const toa = useTranslations("Toast");
  const router = useRouter();
  const { id, source } = useSongListContext();
  const queryClient = useQueryClient();

  async function removeFromLibraryFn() {
    const { data, error } = await removeFromLibrary(
      id,
      source as "create" | "reference",
    );

    if (!data || error) {
      const err = new Error("action-failed");
      err.name = "custom_error";
      throw err;
    }
    return data;
  }
  const mutation = useMutation({
    mutationFn: removeFromLibraryFn,
    onMutate: () => {
      // This runs BEFORE mutationFn
      const toastId = toast.loading(toa("loading")); // trigger loading toast
      return { toastId }; // pass to onSuccess / onError
    },
    onSuccess: (data, _, context) => {
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
      if (!context.toastId) return;
      toast.success(toa("removeFromLib.removeFromLibSuccess"), {
        id: context.toastId,
      });
    },
    onError: (_, __, context) => {
      if (!context?.toastId) return;
      toast.error(toa("error"), { id: context.toastId });
    },
  });
  function handleRemove() {
    mutation.mutate();
  }
  return (
    <OptionItem>
      <OptionButton action={handleRemove}>
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
