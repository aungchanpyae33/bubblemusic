import { DeviceCheck } from "@/lib/DeviceCheck";
import { getTranslations } from "next-intl/server";
import type { listInfo } from "../../../database.types-fest";
import type { ListSongPage } from "@/database/data-types-return";
import ListUpperContainer from "./ListUpperContainer";

interface ListUpperWrapperProps {
  list: listInfo | ListSongPage;
}
async function ListUpperWrapper({ list }: ListUpperWrapperProps) {
  const l = await getTranslations("ListTitle");
  const deviceFromUserAgent = await DeviceCheck();
  return <ListUpperContainer l={l} list={list} device={deviceFromUserAgent} />;
}

export default ListUpperWrapper;
