import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertDataAction } from "@/actions/createPlaylist";
import { useTranslations } from "next-intl";
import IconWrapper from "../general/IconWrapper";
import { X } from "lucide-react";
import TitleInput from "./TitleInput";
import SubmitButton from "./SubmitButton";
import CheckTypeBase from "./CheckType/CheckTypeBase";
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
          <legend className="text-lg font-semibold flex w-full justify-between items-center  text-foreground mb-4">
            <h3 className="">{b("newPlaylist")}</h3>
            <button
              type="button"
              className=" bg-transparent transition-colors  duration-200 hover:bg-surface-2 p-1 rounded-full flex items-center justify-center"
              onClick={() => {}}
            >
              <IconWrapper size="large" Icon={X} />
            </button>
          </legend>

          <TitleInput name="name" />
          <CheckTypeBase name="checkType" />
          <SubmitButton text={b("create")} isPending={mutation.isPending} />
        </fieldset>
      </form>
    </FormProvider>
  );
}

export default PlaylistCreateForm;
