import { X } from "lucide-react";
import IconWrapper from "../IconWrapper";
import TitleInput from "@/ui/navtopBar/createPlaylist/TitleInput";
import SubmitButton from "@/ui/navtopBar/createPlaylist/SubmitButton";
import Form from "next/form";
import {
  editToPlaylist,
  editToPlaylistAction,
  editToPlaylistProps,
  useEditToPlaylist,
} from "@/lib/zustand";
import { useTransition } from "react";
import useEditPlaylistMutate from "@/lib/CustomHooks/mutation/EditPlaylistMutate";
import { useTranslations } from "next-intl";
import CheckType from "@/ui/navtopBar/createPlaylist/CheckType/CheckType";

function EditContentBox() {
  const b = useTranslations("block");
  const { id, name } = useEditToPlaylist(
    (state: editToPlaylist) => state.editToPlaylist,
  ) as editToPlaylistProps;
  const editToPlaylistAction = useEditToPlaylist(
    (state: editToPlaylistAction) => state.editToPlaylistAction,
  );
  const [isPending, startTransition] = useTransition();
  const mutation = useEditPlaylistMutate();
  function handleEdit(id: string, updateName: string, p_is_public: boolean) {
    mutation.mutate({ playlistId: id, playlistName: updateName, p_is_public });
  }
  return (
    <Form
      action={async (formData: FormData) => {
        startTransition(async () => {
          const playlistname = formData.get("playlistname");
          const id = formData.get("id");
          const type = formData.get("typeCheck");
          const check_type = type === "public" ? true : false;
          if (
            typeof playlistname !== "string" ||
            typeof id !== "string" ||
            typeof type !== "string"
          ) {
            console.error("Invalid form data");
            return;
          }
          handleEdit(id, playlistname, check_type);
        });
      }}
      className=""
      id="createPlaylist"
    >
      <fieldset className="flex flex-col gap-2 items-start">
        <legend className="text-lg font-semibold flex w-full justify-between items-center  text-foreground mb-4">
          <h3 className="">{b("newPlaylist")}</h3>
          <button
            type="button"
            className=" bg-transparent transition-colors  duration-200 hover:bg-surface-2 p-1 rounded-full flex items-center justify-center"
            onClick={() => {
              editToPlaylistAction({});
            }}
          >
            <IconWrapper size="large" Icon={X} />
          </button>
        </legend>
        <input type="text" name="id" defaultValue={id} hidden />
        <TitleInput initValue={name} />
        <CheckType id={id} />
        <SubmitButton isPending={isPending} />
      </fieldset>
    </Form>
  );
}

export default EditContentBox;
