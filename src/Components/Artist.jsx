import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import { useMusic } from "../Context/MusicContext";

const LASTFM_KEY = "b766b983744bdb7458c72d5949eeddcc";
const YT_KEY = "AIzaSyCglL_RPgBVk3WLkzrKR_6ismBrWQwPWIk";

const Artist = ({ artists }) => {
  const { id } = useParams();
  const artist = artists.find((a) => a?.id === id);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [color, setcolor] = useState("");
  const { playSong, currentSong, isPlaying, isLoading } = useMusic();

  useEffect(() => {
    const colors = ["bg-red-800","bg-pink-800","bg-lime-800","bg-stone-700","bg-green-800","bg-cyan-800","bg-sky-800","bg-orange-800","bg-yellow-800","bg-blue-800","bg-purple-800"];
    setcolor(colors[Math.floor(Math.random() * colors.length)]);

    const fetchSongs = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${encodeURIComponent(id)}&api_key=${LASTFM_KEY}&format=json&limit=20`
        );
        const data = await res.json();
        const tracks = data?.toptracks?.track || [];

        const withDetails = await Promise.all(
          tracks.map(async (s) => {
            try {
              // Step 1: Last.fm album art try karo
              const lfmRes = await fetch(
                `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&track=${encodeURIComponent(s.name)}&artist=${encodeURIComponent(id)}&api_key=${LASTFM_KEY}&format=json`
              );
              const lfmData = await lfmRes.json();
              const images = lfmData?.track?.album?.image || [];
              let imgUrl = images.find(i => i.size === "extralarge")?.["#text"] ||
                           images.find(i => i.size === "large")?.["#text"] || "";
              const durationMs = parseInt(lfmData?.track?.duration || 0);

              // Step 2: Agar Last.fm image nahi mili toh YouTube thumbnail lo
              if (!imgUrl || imgUrl.includes("2a96cbd8b46e442fc41c2b86b821562f")) {
                const ytRes = await fetch(
                  `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(s.name + " " + id + " song")}&type=video&maxResults=1&key=${YT_KEY}`
                );
                const ytData = await ytRes.json();
                const item = ytData?.items?.[0];
                imgUrl = item?.snippet?.thumbnails?.medium?.url || "";
              }

              return { ...s, imgUrl, durationMs };
            } catch {
              return { ...s, imgUrl: "", durationMs: 0 };
            }
          })
        );
        setSongs(withDetails);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, [id]);

  const handlePlaySong = (song, index) => {
    const songQueue = songs.map((s) => ({
      name: s.name,
      artist: id,
      image: s.imgUrl || "",
      spotifyId: s.url,
    }));
    playSong(songQueue[index], songQueue, index);
  };

  const formatDuration = (ms) => {
    if (!ms) return "--:--";
    const totalSec = Math.floor(ms / 1000);
    return `${Math.floor(totalSec / 60)}:${String(totalSec % 60).padStart(2, "0")}`;
  };

  return (
    <div className="bg-zinc-900 text-white min-h-screen w-full">
      <div className={`${color} pb-8`}>
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 p-4 sm:p-8 pt-8">
          <div className="h-36 w-36 sm:h-48 sm:w-48 lg:h-56 lg:w-56 rounded-full overflow-hidden bg-zinc-700 flex-shrink-0 shadow-2xl">
            {artist?.images?.[0]?.url
              ? <img src={artist.images[0].url} className="h-full w-full object-cover" alt={artist.name} />
              : <div className="h-full w-full flex items-center justify-center text-6xl">🎵</div>
            }
          </div>
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-300">Artist</span>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold leading-none">{artist?.name || id}</h1>
            <p className="text-sm text-zinc-300 mt-1">
              {Number(artist?.followers?.total || 0).toLocaleString()} listeners
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-8 py-6">
        <h2 className="text-2xl font-bold mb-4">Popular</h2>
        {loading ? (
          <div className="flex flex-col gap-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2">
                <div className="w-5 h-4 bg-zinc-800 rounded animate-pulse" />
                <div className="h-11 w-11 bg-zinc-800 rounded animate-pulse" />
                <div className="flex flex-col gap-1 flex-1">
                  <div className="h-3 w-48 bg-zinc-800 rounded animate-pulse" />
                  <div className="h-2 w-28 bg-zinc-800 rounded animate-pulse" />
                </div>
                <div className="h-3 w-8 bg-zinc-800 rounded animate-pulse hidden sm:block" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {songs.map((song, index) => {
              const isCurrentSong = currentSong?.spotifyId === song.url;
              return (
                <div
                  key={song.url || index}
                  onClick={() => handlePlaySong(song, index)}
                  className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer group transition-colors ${isCurrentSong ? "bg-white/10" : "hover:bg-white/5"}`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-5 text-center flex-shrink-0">
                      {isCurrentSong && isPlaying
                        ? <span className="text-green-400 text-xs">▶</span>
                        : <span className="text-zinc-400 text-sm group-hover:hidden">{index + 1}</span>
                      }
                      <span className="hidden group-hover:inline text-white text-sm">▶</span>
                    </div>
                    <div className="h-11 w-11 rounded bg-zinc-700 overflow-hidden flex-shrink-0">
                      {song.imgUrl
                        ? <img src={song.imgUrl} className="h-full w-full object-cover" alt={song.name} />
                        : <div className="h-full w-full flex items-center justify-center text-lg">🎵</div>
                      }
                    </div>
                    <div className="min-w-0">
                      <p className={`font-semibold truncate text-sm sm:text-base ${isCurrentSong ? "text-green-400" : "text-white"}`}>
                        {song.name}
                      </p>
                      <p className="text-zinc-400 text-xs truncate">{id}</p>
                    </div>
                  </div>
                  {isCurrentSong && isLoading && (
                    <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin mx-3 flex-shrink-0" />
                  )}
                  <span className="text-zinc-400 text-sm ml-4 flex-shrink-0 hidden sm:block">
                    {formatDuration(song.durationMs)}
                  </span>
                </div>
              );
            })}
            {songs.length === 0 && <p className="text-zinc-500 text-center py-10">Koi song nahi mila</p>}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Artist;