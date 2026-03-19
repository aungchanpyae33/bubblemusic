import { getLikedId, getUserLib } from "@/database/data";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ReactNode } from "react";

async function LibandLikeHyration({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["user-library"],
      queryFn: getUserLib,
      gcTime: Infinity,
    }),
    queryClient.prefetchQuery({
      queryKey: ["liked-id"],
      queryFn: getLikedId,
      gcTime: Infinity,
    }),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}

export default LibandLikeHyration;
