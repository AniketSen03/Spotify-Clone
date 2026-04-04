import React, { useState, useRef, useEffect } from "react";
import { useMusic } from "../Context/MusicContext";

const LASTFM_KEY = "b766b983744bdb7458c72d5949eeddcc";

const Header = () => {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { playSong } = useMusic();
  const debounceRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setShowDropdown(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const searchSongs = async (q) => {
    if (!q.trim()) { setSongs([]); setShowDropdown(false); return; }
    setLoading(true);
    try {
      const res = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(q)}&api_key=${LASTFM_KEY}&format=json&limit=10`
      );
      const data = await res.json();
      const trackList = data?.results?.trackmatches?.track || [];

      // Sort by listeners — most popular first
      const sorted = [...trackList].sort((a, b) =>
        parseInt(b.listeners || 0) - parseInt(a.listeners || 0)
      );

      // Get album art for each song from Last.fm in parallel
      const withArt = await Promise.all(
        sorted.slice(0, 7).map(async (s) => {
          try {
            const r = await fetch(
              `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&track=${encodeURIComponent(s.name)}&artist=${encodeURIComponent(s.artist)}&api_key=${LASTFM_KEY}&format=json`
            );
            const d = await r.json();
            const images = d?.track?.album?.image || [];
            const img = images.find(i => i.size === "extralarge")?.["#text"] ||
                        images.find(i => i.size === "large")?.["#text"] || "";
            return {
              ...s,
              imgUrl: (!img || img.includes("2a96cbd8b46e442fc41c2b86b821562f")) ? "" : img,
              albumName: d?.track?.album?.title || "",
            };
          } catch { return { ...s, imgUrl: "", albumName: "" }; }
        })
      );

      setSongs(withArt);
      setShowDropdown(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => searchSongs(val), 400);
  };

  const handleSongPlay = (song) => {
    setShowDropdown(false);
    setQuery("");
    playSong({
      name: song.name,
      artist: song.artist,
      image: song.imgUrl || "",
      spotifyId: song.url,
    });
  };

  return (
    <div className="flex items-center justify-between px-3 sm:px-6 h-14 sm:h-16 bg-zinc-950 sticky top-0 z-40 border-b border-zinc-800">

      {/* Logo */}
      <img src="/Logo.png" alt="Logo" className="h-8 sm:h-10 flex-shrink-0" />

      {/* Search */}
      <div className="relative flex-1 max-w-xl mx-4" ref={dropdownRef}>
        <div className="flex items-center bg-zinc-800 rounded-full px-4 py-2 gap-2 focus-within:ring-2 focus-within:ring-white transition-all">
          {loading ? (
            <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin flex-shrink-0" />
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-zinc-400 flex-shrink-0">
              <path d="M10.533 1.279C5.352 1.279 1.126 5.419 1.126 10.558c0 5.139 4.226 9.279 9.407 9.279 2.234 0 4.29-.77 5.907-2.057l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.337-4.337A9.226 9.226 0 0 0 19.94 10.558C19.94 5.419 15.714 1.279 10.533 1.279zm-7.407 9.279c0-4.006 3.302-7.279 7.407-7.279s7.407 3.273 7.407 7.279-3.302 7.279-7.407 7.279S3.126 14.564 3.126 10.558z" />
            </svg>
          )}
          <input
            type="text"
            value={query}
            onChange={handleInput}
            onFocus={() => songs.length > 0 && setShowDropdown(true)}
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-zinc-500"
            placeholder="Search songs..."
          />
          {query && (
            <button
              onClick={() => { setQuery(""); setSongs([]); setShowDropdown(false); }}
              className="text-zinc-500 hover:text-white text-sm"
            >✕</button>
          )}
        </div>

        {/* Songs Dropdown */}
        {showDropdown && songs.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden z-50 max-h-[70vh] overflow-y-auto">
            {songs.map((song, i) => (
              <div
                key={i}
                onClick={() => handleSongPlay(song)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 cursor-pointer transition-colors group"
              >
                {/* Album Art */}
                <div className="h-11 w-11 rounded bg-zinc-700 overflow-hidden flex-shrink-0 relative">
                  {song.imgUrl
                    ? <img src={song.imgUrl} className="h-full w-full object-cover" alt={song.name} />
                    : <div className="h-full w-full flex items-center justify-center text-xl">🎵</div>
                  }
                  {/* Play overlay on hover */}
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white ml-0.5">
                      <path d="M10.68 8.187C9.727 7.676 8.5 8.273 8.5 9.247v5.506c0 .974 1.227 1.571 2.18 1.06l5.139-2.753c.908-.487.908-1.826 0-2.313L10.68 8.187z" />
                    </svg>
                  </div>
                </div>

                {/* Song Info */}
                <div className="min-w-0 flex-1">
                  <p className="text-white text-sm font-semibold truncate">{song.name}</p>
                  <p className="text-zinc-400 text-xs truncate">
                    {song.artist}{song.albumName ? ` • ${song.albumName}` : ""}
                  </p>
                </div>

                {/* Listeners */}
                <span className="text-zinc-600 text-xs flex-shrink-0 hidden sm:block">
                  {parseInt(song.listeners || 0).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* No results */}
        {showDropdown && !loading && songs.length === 0 && query.trim() && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-center z-50">
            <p className="text-zinc-500 text-sm">"{query}" ka koi song nahi mila</p>
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className="h-9 w-9 rounded-full bg-green-500 flex items-center justify-center font-bold text-black text-sm flex-shrink-0">A</div>
    </div>
  );
};

export default Header;