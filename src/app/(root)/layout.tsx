import NavBar from "@/ui/NavtopBar/NavBar";
import { Suspense } from "react";
import Main from "@/ui/Main/Main";
import Queue from "@/ui/Queue/Queue";
import Footer from "@/ui/Footer/Footer";
import QueueWrapper from "@/ui/Queue/QueueWrapper";
import QueryClientPrv from "@/lib/tanstack/QueryClient";
import ModalBox from "@/ui/general/ModalAction/ModalBox";
import LibandLikeHyration from "@/lib/HydrationData/LibandLikeHyration";
import LoadingAudioPlayer from "@/ui/loading/LoadingAudioPlayer";
import QueueNotFullScreen from "@/ui/Queue/QueueNotFullScreen";
import ContextAudioWrapper from "@/Context/ContextAudioWrapper";
import AudioFooterBar from "@/ui/AudioFooterBar/AudioFooterBar";
import UserInfoFetcher from "@/lib/UserInfoFetch/UserInfoFetch";
import PlaceHolderScrollToTop from "@/Placeholder/PlaceHolderScrollToTop";
import BeforeLoad from "@/Placeholder/PlaceholderBeforeLoad";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientPrv>
      <UserInfoFetcher>
        <LibandLikeHyration>
          <ContextAudioWrapper>
            <PlaceHolderScrollToTop />
            <BeforeLoad />
            <NavBar />
            <div className="flex flex-1 overflow-hidden relative">
              <Main>
                {children}
                <Footer />
              </Main>
              <QueueWrapper>
                <Queue wrapper={QueueNotFullScreen} />
              </QueueWrapper>

              <ModalBox />
            </div>
            <Suspense fallback={<LoadingAudioPlayer />}>
              <AudioFooterBar />
            </Suspense>
          </ContextAudioWrapper>
        </LibandLikeHyration>
      </UserInfoFetcher>
    </QueryClientPrv>
  );
}
