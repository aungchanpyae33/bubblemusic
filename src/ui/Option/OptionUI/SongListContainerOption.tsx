"use client";
import { useSongListContext } from "@/Context/ContextSongListContainer";
import PlaylistContainerOption from "../PlaylistOption/PlaylistContainerOption";
import AlbumContainerOption from "../AlbumOption/AlbumContainerOption";
import ArtistContainerOption from "../ArtistOption/ArtistContainerOption";
import ProfileOption from "../ProfileOption/ProfileOption";

function SongListContainerOption() {
  const { type } = useSongListContext();
  if (type === "playlist") return <PlaylistContainerOption />;
  if (type === "album") return <AlbumContainerOption />;
  if (type === "artist") return <ArtistContainerOption />;
  if (type === "profile") return <ProfileOption />;
  return null;
}

export default SongListContainerOption;
