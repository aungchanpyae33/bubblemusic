import { getSongList } from "@/database/data";
import { NextRequest, NextResponse } from "next/server";
import { Database } from "../../../../database.types";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type") as
    | Database["public"]["Enums"]["media_item_type"]
    | null;
  const id = searchParams.get("id");
  try {
    if (!type || !id) throw new Error("id  or type is required");
    const { data, error } = await getSongList(id, type);
    return new NextResponse(JSON.stringify({ data, error }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        data: null,
        error: `Internal server error ,${error}`,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
