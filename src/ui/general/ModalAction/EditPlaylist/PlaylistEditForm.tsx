import { useOutputDefaultCheckType } from "@/lib/CustomHooks/useOutputDefaultCheckType";
import {
  editToPlaylistModalBox,
  editToPlaylistModalBoxAction,
  editToPlaylistModalBoxProps,
  useEditToPlaylist,
} from "@/lib/zustand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { editPlaylist } from "@/actions/editPlaylist";
import { useTranslations } from "next-intl";
import TitleInput from "@/ui/PlaylistForm/TitleInput";
import CheckTypeBase from "@/ui/PlaylistForm/CheckType/CheckTypeBase";
import SubmitButton from "@/ui/PlaylistForm/SubmitButton";
import { closeModalBox } from "@/lib/closeModalBox";
import { toast } from "sonner";
export interface FormDataTypeEdit {
  id: string;
  name: string;
  checkType: "public" | "private";
}

function PlaylistEditForm() {
  const b = useTranslations("block");
  const toa = useTranslations("Toast");
  const { id, name, originParentTriggerRef } = useEditToPlaylist(
    (state: editToPlaylistModalBox) => state.editToPlaylistModalBox,
  ) as editToPlaylistModalBoxProps;
  const editToPlaylistModalBoxAction = useEditToPlaylist(
    (state: editToPlaylistModalBoxAction) => state.editToPlaylistModalBoxAction,
  );
  const checkType = useOutputDefaultCheckType(id);
  const queryClient = useQueryClient();
  const defaultValue: FormDataTypeEdit = {
    id,
    name,
    checkType,
  };

  const mutation = useMutation({
    mutationFn: async (data: FormDataTypeEdit) => {
      const { data: playlistData, error: playlistError } = await editPlaylist({
        playlistId: data.id,
        playlistName: data.name,
        checkType: data.checkType,
      });
      if (!data || playlistError) {
        const err = new Error("action-failed");
        err.name = "custom_error";
        throw err;
      }

      return { data: playlistData, error: playlistError };
    },
    onMutate: () => {
      // This runs BEFORE mutationFn
      const toastId = toast.loading(toa("loading")); // trigger loading toast
      return { toastId }; // pass to onSuccess / onError
    },
    onSuccess: (data, _, context) => {
      queryClient.setQueryData(["user-library"], data);
      if (!context.toastId) return;
      toast.info(toa("playlistAction.playlistEdit"), { id: context.toastId });
    },
    onError: (_, __, context) => {
      if (!context?.toastId) return;
      toast.error(toa("error"), { id: context.toastId });
    },
    onSettled: () => {
      closeModalBox(editToPlaylistModalBoxAction, originParentTriggerRef);
    },
  });
  const handleAction = (data: FormDataTypeEdit) => {
    mutation.mutate(data);
  };

  const methods = useForm<FormDataTypeEdit>({
    mode: "onChange",
    defaultValues: defaultValue,
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleAction)}>
        <fieldset className=" flex flex-col gap-3 items-start">
          <TitleInput name="name" />
          <CheckTypeBase name="checkType" />
          <SubmitButton text={b("edit")} isPending={mutation.isPending} />
        </fieldset>
      </form>
    </FormProvider>
  );
}

export default PlaylistEditForm;
