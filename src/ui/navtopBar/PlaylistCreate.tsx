import { X } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import { useMemo, useRef, useTransition } from "react";
import Form from "next/form";
import FocusTrap from "../Footer/audioFull/FocusTrap";
import TitleInput from "./createPlaylist/TitleInput";
import SubmitButton from "./createPlaylist/SubmitButton";
import InitCreateButton from "./createPlaylist/InitCreateButton";
import { insertDataAction } from "@/actions/createPlaylist";
import { useQueryClient } from "@tanstack/react-query";
import { useMoreOptionStackContext } from "../trackComponent/MoreOptionStackContext";
import useFocusOnOpen from "@/lib/CustomHooks/useFocusOnOpen";
import { useTranslations } from "next-intl";
import CheckTypeCreate from "./createPlaylist/CheckType/CheckTypeCreate";

function PlaylistCreate({ stackNum }: { stackNum: number }) {
  const b = useTranslations("block");
  const queryClient = useQueryClient();
  const { stack, setStack } = useMoreOptionStackContext();
  const formParentRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  // is it sub child permanant stack num is equl or less than current stack?
  const stayShow = useMemo(() => stackNum <= stack, [stack, stackNum]);
  useFocusOnOpen(stayShow, formParentRef);

  return (
    <>
      <InitCreateButton stackNum={stackNum} />
      {stayShow && (
        <div
          className="fixed   w-screen bg-overlay   h-screen inset-0 z-40"
          onClick={() => setStack(stackNum - 1)}
        >
          <FocusTrap refFocus={formParentRef}>
            <div
              tabIndex={0}
              ref={formParentRef}
              className="absolute   top-[50%] left-[50%] -translate-x-[50%] bg-pop p-3 rounded-md border border-borderFull -translate-y-[50%]  max-w-[480px] w-[94%]"
              onClick={(e) => e.stopPropagation()}
            >
              <Form
                action={async (formData: FormData) => {
                  startTransition(async () => {
                    const playlistname = formData.get("playlistname");
                    const type = formData.get("typeCheck");
                    const check_type = type === "public" ? true : false;
                    if (
                      typeof playlistname !== "string" ||
                      typeof type !== "string"
                    ) {
                      return;
                    }
                    const { data, error } = await insertDataAction(
                      playlistname,
                      check_type,
                    );
                    if (error) return;
                    if (data) {
                      queryClient.setQueryData(["user-library"], {
                        data,
                        error: null,
                      });
                      setStack(stackNum - 1);
                    }
                  });
                }}
                className=""
                id="createPlaylist"
              >
                <fieldset className=" flex flex-col gap-2 items-start">
                  <legend className="text-lg font-semibold flex w-full justify-between items-center  text-foreground mb-4">
                    <h3 className="">{b("newPlaylist")}</h3>
                    <button
                      type="button"
                      className=" bg-transparent transition-colors  duration-200 hover:bg-surface-2 p-1 rounded-full flex items-center justify-center"
                      onClick={() => {
                        setStack(stackNum - 1);
                      }}
                    >
                      <IconWrapper size="large" Icon={X} />
                    </button>
                  </legend>
                  <TitleInput />
                  <CheckTypeCreate />
                  <SubmitButton isPending={isPending} />
                </fieldset>
              </Form>
            </div>
          </FocusTrap>
        </div>
      )}
    </>
  );
}

export default PlaylistCreate;
