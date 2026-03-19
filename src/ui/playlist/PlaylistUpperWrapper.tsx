"use client";

import { useDeviceContext } from "@/lib/DeviceContext/ContextDeviceCheck";
import { useTranslations } from "next-intl";
import { useSongListContext } from "./playlistOption/ContextSongListContainer";
import ListUpperContainer from "../ListContainer/ListUpperContainer";

function PlaylistUpperWrapper() {
  const l = useTranslations("ListTitle");
  const { device } = useDeviceContext();
  const list = useSongListContext();
  return <ListUpperContainer l={l} device={device} list={list} />;
}

export default PlaylistUpperWrapper;
