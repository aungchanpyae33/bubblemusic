import { TimeFormat } from "@/lib/TimeFormat";

function ListRowTimeInfo({ duration }: { duration: number }) {
  return (
    <div className="   hidden sm:flex items-center justify-center     ">
      {TimeFormat(duration)}
    </div>
  );
}

export default ListRowTimeInfo;
