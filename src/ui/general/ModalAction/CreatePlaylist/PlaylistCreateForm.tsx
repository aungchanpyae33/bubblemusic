import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertDataAction } from "@/actions/createPlaylist";
import { useTranslations } from "next-intl";
import TitleInput from "@/ui/PlaylistForm/TitleInput";
import CheckTypeBase from "@/ui/PlaylistForm/CheckType/CheckTypeBase";
import SubmitButton from "@/ui/PlaylistForm/SubmitButton";
import { toast } from "sonner";
import { closeModalBox } from "@/lib/closeModalBox";
import {
  createToPlaylistModalBox,
  createToPlaylistModalBoxAction,
  createToPlaylistModalBoxProps,
  useCreateToPlaylist,
} from "@/lib/zustand";
export interface FormDataTypeCreate {
  name: string;
  checkType: "public" | "private";
}

const defaultValue: FormDataTypeCreate = {
  name: "",
  checkType: "public",
};

async function insertDataActionFn(data: FormDataTypeCreate) {
  const { data: playlistData, error: playlistError } = await insertDataAction({
    playlist_name: data.name,
    checkType: data.checkType,
  });
  if (!data || playlistError) {
    const err = new Error("action-failed");
    err.name = "custom_error";
    throw err;
  }

  return { data: playlistData, error: playlistError };
}

function PlaylistCreateForm() {
  const b = useTranslations("block");
  const toa = useTranslations("Toast");
  const { originParentTriggerRef } = useCreateToPlaylist(
    (state: createToPlaylistModalBox) => state.createToPlaylistModalBox,
  ) as createToPlaylistModalBoxProps;
  const createToPlaylistModalBoxAction = useCreateToPlaylist(
    (state: createToPlaylistModalBoxAction) =>
      state.createToPlaylistModalBoxAction,
  );
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: insertDataActionFn,
    onMutate: () => {
      // This runs BEFORE mutationFn
      const toastId = toast.loading(toa("loading")); // trigger loading toast
      return { toastId }; // pass to onSuccess / onError
    },
    onSuccess: (data, _, context) => {
      queryClient.setQueryData(["user-library"], data);
      if (!context.toastId) return;
      toast.success(toa("playlistAction.playlistCreate"), {
        id: context.toastId,
      });
    },
    onError: (_, __, context) => {
      if (!context?.toastId) return;
      toast.error(toa("error"), { id: context.toastId });
    },
    onSettled: () => {
      closeModalBox(createToPlaylistModalBoxAction, originParentTriggerRef);
    },
  });
  const handleAction = (data: FormDataTypeCreate) => {
    mutation.mutate(data);
  };
  const methods = useForm<FormDataTypeCreate>({
    mode: "onChange",
    defaultValues: defaultValue,
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleAction)}>
        <fieldset className=" flex flex-col gap-3 items-start">
          <TitleInput name="name" />
          <CheckTypeBase name="checkType" />
          <SubmitButton text={b("create")} isPending={mutation.isPending} />
        </fieldset>
      </form>
    </FormProvider>
  );
}

export default PlaylistCreateForm;
