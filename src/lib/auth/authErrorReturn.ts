import type { AuthApiError } from "@supabase/supabase-js";

export function authErrorReturn(authError: AuthApiError): string {
  switch (authError.code) {
    case "email_address_invalid":
      return "wrongEmail";

    case "email_exists":
      return "alreadyEmail";

    case "email_not_confirmed":
      return "notConfirmEmail";

    case "invalid_credentials":
      return "wrongCredentials";

    case "user_already_exists":
      return "alreadyUser";

    case "user_not_found":
      return "notFoundUser";

    case "weak_password":
      return "passwordComplexity";

    default:
      return "wentWrong";
  }
}
