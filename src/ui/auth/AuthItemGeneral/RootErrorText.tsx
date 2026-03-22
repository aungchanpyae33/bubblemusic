import ErrorText from "@/ui/Error/ErrorInputText";
import { useFormContext } from "react-hook-form";

function RootErrorText() {
  const {
    formState: { errors },
  } = useFormContext();
  if (!errors.root) return null;
  return <ErrorText>{errors.root.message}</ErrorText>;
}

export default RootErrorText;
