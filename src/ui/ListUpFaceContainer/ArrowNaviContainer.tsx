"use client";

import { useContainerContext } from "../albumContainer/ContextContainer";

function ArrowNaviContainer() {
  const { arrowNaviRef } = useContainerContext();
  return <div className=" flex gap-1" ref={arrowNaviRef}></div>;
}

export default ArrowNaviContainer;
