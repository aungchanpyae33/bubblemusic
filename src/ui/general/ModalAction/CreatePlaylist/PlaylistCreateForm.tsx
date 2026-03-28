import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertDataAction } from "@/actions/createPlaylist";
import { useTranslations } from "next-intl";
import TitleInput from "@/ui/PlaylistForm/TitleInput";
import CheckTypeBase from "@/ui/PlaylistForm/CheckType/CheckTypeBase";
import SubmitButton from "@/ui/PlaylistForm/SubmitButton";

export interface FormDataTypeCreate {
  name: string;
  checkType: "public" | "private";
}

const defaultValue: FormDataTypeCreate = {
  name: "",
  checkType: "public",
};
function PlaylistCreateForm() {
  const b = useTranslations("block");
  const e = useTranslations("ErrorMsg");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: FormDataTypeCreate) => {
      const { data: playlistData, error: playlistError } =
        await insertDataAction({
          playlist_name: data.name,
          checkType: data.checkType,
        });
      if (!data || playlistError) {
        const err = new Error(e("wentWrong"));
        err.name = "custom_error";
        throw err;
      }

      return { data: playlistData, error: playlistError };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user-library"], data);
    },
    onError: (error) => {
      // todo
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
