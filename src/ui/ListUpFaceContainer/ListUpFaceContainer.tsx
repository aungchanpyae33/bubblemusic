import clsx from "clsx";
import type { listInfo } from "../../../database.types-fest";
import ListUpFaceContainerItem from "./ListUpFaceContainerItem";

export interface ListUpFaceContainerProps {
  list: listInfo;
}

function ListUpFaceContainer({ list }: ListUpFaceContainerProps) {
  return (
    <div
      className={clsx(
        "peer snap-center p-2 rounded-lg hover:bg-surface-2 space-y-3 w-[180px]  md:w-[195px] lg:w-[200px] shrink-0 grow-0 ",
      )}
    >
      <ListUpFaceContainerItem list={list} />
    </div>
  );
}

export default ListUpFaceContainer;
