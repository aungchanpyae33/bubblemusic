import { userFetch } from "@/lib/UserInfoFetch";
import LikeSongSection from "@/ui/LibraryPage/LibPagesUI/LikeSongSection";
import { unauthorized } from "next/navigation";

async function page() {
  const user = await userFetch();
  if (!user) {
    unauthorized();
  }
  return <LikeSongSection />;
}

export default page;
