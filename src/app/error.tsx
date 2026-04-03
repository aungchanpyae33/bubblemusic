"use client";
import AppError from "@/ui/Error/CustomErrorPage/AppError";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <AppError reset={reset} />;
}
