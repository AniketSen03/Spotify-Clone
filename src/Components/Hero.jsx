import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import { useMusic } from "../Context/MusicContext";

const Hero = ({ artists, tokenfetch }) => {
  const { id } = useParams();
  const artist = artists.find((a) => a?.id === id);
  const [songs, setSongs] = useState([]);
  const [color, setcolor] = useState("");
  const { playSong, currentSong, isPlaying, isLoading } = useMusic();

  const fetchArtistSongs = async () => {
    try {
      const res = await fetch(
        `https://api.spotify.com/v1/artists/${id}/top-tracks?market=IN`,
        { headers: { Authorization: `Bearer ${tokenfetch}` } }
      );
      const data = await res.json();
      setSongs(data.tracks || []);
    } catch (err) {
      console.error("Error fetching celebrity songs:", err);
    }
  };

  useEffect(() => {
    const colors = [
      "bg-red-800", "bg-pink-800", "bg-lime-800", "bg-stone-700",
      "bg-green-800", "bg-cyan-800", "bg-sky-800", "bg-orange-800",
      "bg-yellow-800", "bg-blue-800", "bg-purple-800",
    ];
    setcolor(colors[Math.floor(Math.random() * colors.length)]);
    if (tokenfetch) fetchArtistSongs();
  }, [id, tokenfetch]);

  const handlePlaySong = (song, index) => {
    const songQueue = songs.map((s) => ({
      name: s.name,
      artist: artist?.name || s.artists?.[0]?.name || "",
      image: s.album?.images?.[0]?.url || "",
      spotifyId: s.id,
      duration_ms: s.duration_ms,
    }));
    playSong(songQueue[index], songQueue, index);
  };

  return (
    <div className="bg-zinc-900 text-white min-h-screen w-full">
      {/* Hero Section */}
      <div className={`${color} pb-6`}>
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 p-4 sm:p-8 pt-8">
          <img
            src={artist?.images?.[0]?.url || "https://via.placeholder.com/200"}
            className="h-36 w-36 sm:h-48 sm:w-48 lg:h-56 lg:w-56 rounded-full shadow-2xl object-cover flex-shrink-0"
            alt={artist?.name}
          />
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-300">Celebrity</span>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold leading-none">
              {artist?.name}
            </h1>
            <p className="text-sm text-zinc-300 mt-1">
              {artist?.followers?.total?.toLocaleString() || "0"} followers
            </p>
          </div>
        </div>
      </div>

      {/* Songs List */}
      <div className="px-4 sm:px-8 py-6">
        <h2 className="text-2xl font-bold mb-4">Popular Songs</h2>
        <div className="flex flex-col gap-1">
          {songs.map((song, index) => {
            const isCurrentSong = currentSong?.spotifyId === song.id;
            return (
              <div
                key={song.id}
                onClick={() => handlePlaySong(song, index)}
                className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer group transition-colors
                  ${isCurrentSong ? "bg-white/10" : "hover:bg-white/5"}`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-6 text-center flex-shrink-0">
                    {isCurrentSong && isPlaying ? (
                      <span className="text-green-400 text-xs">▶</span>
                    ) : (
                      <span className="text-zinc-400 text-sm group-hover:hidden">{index + 1}</span>
                    )}
                    <span className="hidden group-hover:inline text-white text-sm">▶</span>
                  </div>
                  <img
                    src={song.album?.images?.[0]?.url || "https://via.placeholder.com/50"}
                    className="h-10 w-10 rounded flex-shrink-0 object-cover"
                    alt={song.name}
                  />
                  <div className="min-w-0">
                    <p className={`font-semibold truncate text-sm sm:text-base ${isCurrentSong ? "text-green-400" : "text-white"}`}>
                      {song.name}
                    </p>
                    <p className="text-zinc-400 text-xs truncate">
                      {song.artists?.map((a) => a.name).join(", ")}
                    </p>
                  </div>
                </div>

                {isCurrentSong && isLoading && (
                  <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin mx-3 flex-shrink-0" />
                )}

                <span className="text-zinc-400 text-sm flex-shrink-0 ml-2 hidden sm:block">
                  {Math.floor(song.duration_ms / 60000)}:
                  {String(Math.floor((song.duration_ms % 60000) / 1000)).padStart(2, "0")}
                </span>
              </div>
            );
          })}
        </div>
        {songs.length === 0 && (
          <p className="text-zinc-500 text-center py-10">Loading songs...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Hero;