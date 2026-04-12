function LoadingAudioPlayer() {
  return (
    <div className="fixed bottom-0  h-[70px] left-0 right-0  flex w-full  gap-4 sm:gap-5 md:gap-6 bg-section  lg:gap-10 justify-between backdrop-blur-sm border-t border-seperate-soft ">
      <div className="w-full sm:w-[25%] md:w-[25%] max-w-[375px]  flex items-center">
        <div className=" size-[70px] flex items-center justify-center">
          <div className="size-[62px] bg-placeholder animate-pulse"></div>
        </div>

        <div className=" flex flex-col gap-2">
          <div className="bg-placeholder animate-pulse h-2 w-24"></div>
          <div className="bg-placeholder animate-pulse h-2 w-20"></div>
        </div>
      </div>
      <div className="max-w-[600px] sm:flex-1 w-fit  flex    ">
        <div className=" w-full h-full flex flex-col items-center justify-center gap-3 pr-4 sm:pr-0 ">
          <div className=" flex gap-2 items-center">
            <div className=" size-8 sm:block hidden bg-placeholder animate-pulse"></div>
            <div className=" size-8 sm:block hidden bg-placeholder animate-pulse"></div>
            <div className=" size-9 bg-placeholder animate-pulse"></div>
            <div className=" size-8 sm:block hidden bg-placeholder animate-pulse"></div>
            <div className=" size-8 bg-placeholder animate-pulse"></div>
          </div>
          <div className=" w-full sm:flex hidden gap-2   items-center">
            <div className="w-[50px]"></div>
            <div className=" h-1 flex-1 bg-placeholder animate-pulse"></div>
            <div className="w-[50px]"></div>
          </div>
        </div>
      </div>
      <div className="w-[20%] px-2 md:w-[25%] hidden max-w-[375px] sm:flex  items-center justify-around gap-3">
        <div className=" size-9 bg-placeholder animate-pulse"></div>
        <div className=" size-9 bg-placeholder animate-pulse"></div>
        <div className=" size-9 bg-placeholder animate-pulse"></div>
      </div>
    </div>
  );
}

export default LoadingAudioPlayer;
