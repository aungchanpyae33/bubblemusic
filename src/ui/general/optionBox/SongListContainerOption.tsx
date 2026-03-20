"use client";
import AlbumContainerOption from "@/ui/album/AlbumContainerOption";
import ArtistContainerOption from "@/ui/artist/ArtistContainerOption";
import PlaylistContainerOption from "@/ui/playlist/playlistOption/PlaylistContainerOption";
import ProfileOption from "./ProfileOption";
import { useSongListContext } from "@/Context/ContextSongListContainer";

function SongListContainerOption() {
  const { type } = useSongListContext();
  if (type === "playlist") return <PlaylistContainerOption />;
  if (type === "album") return <AlbumContainerOption />;
  if (type === "artist") return <ArtistContainerOption />;
  if (type === "profile") return <ProfileOption />;
  return null;
}

export default SongListContainerOption;
