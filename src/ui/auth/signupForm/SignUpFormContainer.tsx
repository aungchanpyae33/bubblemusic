"use client";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "nextjs-toploader/app";
import { useTopLoader } from "nextjs-toploader";
import { isAuthApiError } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
import { authErrorReturn } from "@/lib/auth/authErrorReturn";
import { useNaviSet } from "@/lib/CustomHooks/useNaviSet";
import { supabase } from "@/database/supabase";
import EmailInput from "../AuthItemGeneral/EmailInput";
import PasswordInput from "../AuthItemGeneral/PasswordInput";
import RootErrorText from "../AuthItemGeneral/RootErrorText";
import SubmitButton from "../AuthItemGeneral/SubmitButton";
type SignUpValues = {
  email: string;
  password: string;
};
function SignUpFormContainer() {
  const router = useRouter();
  const loader = useTopLoader();
  const [isNavigating, setIsNavigating] = useNaviSet();
  const e = useTranslations("ErrorMsg");
  const methods = useForm<SignUpValues>();
  async function loginAction(data: SignUpValues) {
    if (isNavigating) return;
    try {
      loader.start();
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/login`,
        },
      });

      if (error) throw error;
      setIsNavigating(true);
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      if (isAuthApiError(error)) {
        const message = authErrorReturn(error);
        methods.setError("root", {
          type: "manual",
          message: e(`${message}`),
        });
      } else {
        methods.setError("root", {
          type: "manual",
          message: e("wentWrong"),
        });
      }
      setIsNavigating(false);
      loader.done();
    }
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(loginAction)} className=" space-y-5">
        <EmailInput />
        <PasswordInput />
        <RootErrorText />
        <SubmitButton
          actionText="signup"
          isPending={
            isNavigating ||
            methods.formState.isValidating ||
            methods.formState.isSubmitting
          }
        />
      </form>
    </FormProvider>
  );
}

export default SignUpFormContainer;
