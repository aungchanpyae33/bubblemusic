"use client";

import { useTranslations } from "next-intl";
import ListUpperContainer from "../ListContainer/ListUpperContainer";
import { useDeviceContext } from "@/Context/ContextDeviceCheck";
import { useSongListContext } from "@/Context/ContextSongListContainer";

function PlaylistUpperWrapper() {
  const l = useTranslations("ListTitle");
  const { device } = useDeviceContext();
  const list = useSongListContext();
  return <ListUpperContainer l={l} device={device} list={list} />;
}

export default PlaylistUpperWrapper;
