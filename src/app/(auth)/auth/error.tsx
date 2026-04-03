"use client";
import SubError from "@/ui/Error/CustomErrorPage/SubError";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <SubError reset={reset} />;
}
