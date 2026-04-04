"use client";
import { BookmarkPlus, BookmarkX } from "lucide-react";
import IconWrapper from "../IconWrapper";
import { addToLibrary } from "@/actions/AddToLibrary";
import { useEffect, useState } from "react";
import { removeFromLibrary } from "@/actions/removeFromLibrary";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "nextjs-toploader/app";
import type { GetRecent } from "@/database/data-types-return";
import type {
  MediaItemSource,
  MediaItemType,
} from "../../../../database.types-fest";
import { useSongListContext } from "@/Context/ContextSongListContainer";
import { useUserInfoContext } from "@/Context/ContextUserInfo";
import { SignInModalBoxAction, useSignInModalBox } from "@/lib/zustand";
import { guardToSignIn } from "@/lib/guardToSignIn";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useTopLoader } from "nextjs-toploader";

interface ListContainerAddToLibraryProps {
  id: string;
  type: MediaItemType;
  source: MediaItemSource;
}

async function modifyLib({ id, type, source }: ListContainerAddToLibraryProps) {
  if (source === "create" || source === "reference") {
    return await removeFromLibrary(id, source);
  } else {
    return await addToLibrary(id, type);
  }
}

function isAdd(source: MediaItemSource) {
  if (source === "create" || source === "reference") {
    return false;
  } else {
    return true;
  }
}

function ListContainerAddToLibrary() {
  const { id, type, source } = useSongListContext();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [itemSource, setItemSource] = useState(isAdd(source));
  const { userInfo } = useUserInfoContext();
  const signInModalBoxAction = useSignInModalBox(
    (state: SignInModalBoxAction) => state.signInModalBoxAction,
  );
  const toa = useTranslations("Toast");
  const loader = useTopLoader();
  useEffect(() => {
    setItemSource(isAdd(source));
  }, [source]);

  async function ActionToLibraryFn() {
    const { data, error } = await modifyLib({ id, type, source });

    if (!data || error) {
      const err = new Error("action-failed");
      err.name = "custom_error";
      throw err;
    }
    return data;
  }

  const mutation = useMutation({
    mutationFn: ActionToLibraryFn,
    onMutate: () => {
      loader.start();
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
    onSettled: () => {
      loader.done();
    },
  });

  function handleAddToLib() {
    if (!userInfo) {
      return guardToSignIn({}, signInModalBoxAction);
    }
    setItemSource(itemSource);
    mutation.mutate();
  }
  return (
    <button onClick={handleAddToLib}>
      {itemSource ? (
        <IconWrapper size="exLarge" Icon={BookmarkPlus} className="" />
      ) : (
        <IconWrapper size="exLarge" Icon={BookmarkX} className=" fill-brand" />
      )}
    </button>
  );
}
export default ListContainerAddToLibrary;
