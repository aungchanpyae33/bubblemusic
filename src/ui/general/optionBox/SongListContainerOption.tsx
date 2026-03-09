"use client";
import AlbumContainerOption from "@/ui/album/AlbumContainerOption";
import ArtistContainerOption from "@/ui/artist/ArtistContainerOption";
import {
  useSongListContext,
} from "@/ui/playlist/playlistOption/ContextSongListContainer";
import PlaylistContainerOption from "@/ui/playlist/playlistOption/PlaylistContainerOption";
import ProfileOption from "./ProfileOption";

function SongListContainerOption() {
  const { type } = useSongListContext();
  if (type === "playlist") return <PlaylistContainerOption />;
  if (type === "album") return <AlbumContainerOption />;
  if (type === "artist") return <ArtistContainerOption />;
  if (type === "profile") return <ProfileOption />;
  return null;
}

export default SongListContainerOption;
