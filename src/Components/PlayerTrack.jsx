import React, { useEffect, useRef, useState } from "react";
import { useMusic } from "../Context/MusicContext";

const PlayerTrack = () => {
  const { currentSong, isPlaying, isLoading, videoId, playNext, playPrev, togglePlay } = useMusic();
  const playerRef = useRef(null);
  const playerInstanceRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const intervalRef = useRef(null);
  const isReadyRef = useRef(false);

  // Load YouTube IFrame API once
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  }, []);

  // Recreate player every time videoId changes
  useEffect(() => {
    if (!videoId) return;
    isReadyRef.current = false;

    const createPlayer = () => {
      // Destroy old player
      if (playerInstanceRef.current) {
        try { playerInstanceRef.current.destroy(); } catch {}
        playerInstanceRef.current = null;
      }

      // Reset progress
      setProgress(0);
      setCurrentTime(0);
      setDuration(0);
      clearInterval(intervalRef.current);

      // Create new div for player (fresh every time)
      const container = document.getElementById("yt-player-container");
      if (!container) return;
      container.innerHTML = "";
      const div = document.createElement("div");
      div.id = "yt-player-" + videoId;
      container.appendChild(div);

      playerInstanceRef.current = new window.YT.Player(div, {
        videoId,
        height: "1",
        width: "1",
        playerVars: { autoplay: 1, controls: 0, disablekb: 1, fs: 0, rel: 0 },
        events: {
          onReady: (e) => {
            isReadyRef.current = true;
            e.target.setVolume(volume);
            e.target.playVideo();
            setDuration(e.target.getDuration());

            // Start progress tracking
            clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
              if (playerInstanceRef.current?.getCurrentTime) {
                const ct = playerInstanceRef.current.getCurrentTime() || 0;
                const dur = playerInstanceRef.current.getDuration() || 0;
                setCurrentTime(ct);
                setDuration(dur);
                setProgress(dur ? (ct / dur) * 100 : 0);
              }
            }, 500);
          },
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.ENDED) playNext();
          },
        },
      });
    };

    if (window.YT?.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => clearInterval(intervalRef.current);
  }, [videoId]);

  // Sync play/pause
  useEffect(() => {
    if (!isReadyRef.current || !playerInstanceRef.current) return;
    try {
      if (isPlaying) playerInstanceRef.current.playVideo();
      else playerInstanceRef.current.pauseVideo();
    } catch {}
  }, [isPlaying]);

  const handleSeek = (val) => {
    if (playerInstanceRef.current?.seekTo && duration) {
      playerInstanceRef.current.seekTo((val / 100) * duration, true);
      setProgress(val);
    }
  };

  const handleVolume = (val) => {
    setVolume(val);
    if (playerInstanceRef.current?.setVolume) {
      playerInstanceRef.current.setVolume(val);
    }
  };

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return "0:00";
    return `${Math.floor(secs / 60)}:${String(Math.floor(secs % 60)).padStart(2, "0")}`;
  };

  return (
    <>
      {/* Hidden YouTube player */}
      <div id="yt-player-container" className="hidden" />

      {/* Bottom Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950 border-t border-zinc-800 px-3 sm:px-6 py-2 flex flex-col gap-1">

        {/* Seekbar */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-zinc-500 text-xs w-10 text-right flex-shrink-0">{formatTime(currentTime)}</span>
          <input
            type="range" min={0} max={100}
            value={progress}
            onChange={(e) => handleSeek(Number(e.target.value))}
            disabled={!currentSong}
            className="flex-1 h-1 accent-green-500 cursor-pointer disabled:opacity-30"
          />
          <span className="text-zinc-500 text-xs w-10 flex-shrink-0">{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">

          {/* Left: Song Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="h-10 w-10 rounded bg-zinc-800 flex-shrink-0 overflow-hidden">
              {currentSong?.image
                ? <img src={currentSong.image} className="h-full w-full object-cover" alt={currentSong.name} />
                : <div className="h-full w-full flex items-center justify-center text-zinc-600 text-lg">♪</div>
              }
            </div>
            <div className="min-w-0 hidden sm:block">
              {currentSong ? (
                <>
                  <p className="text-white text-sm font-semibold truncate">{currentSong.name}</p>
                  <p className="text-zinc-400 text-xs truncate">{currentSong.artist}</p>
                </>
              ) : (
                <p className="text-zinc-500 text-sm">No song selected — pick a track to start listening</p>
              )}
            </div>
          </div>

          {/* Center: Prev / Play / Next */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button onClick={playPrev} disabled={!currentSong} className="text-zinc-400 hover:text-white disabled:opacity-30 transition-colors">
              <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current">
                <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z" />
              </svg>
            </button>

            <button
              onClick={togglePlay}
              disabled={!currentSong}
              className="h-10 w-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-40"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-black">
                  <path d="M10.5 9C10.5 8.448 10.052 8 9.5 8S8.5 8.448 8.5 9v6c0 .552.448 1 1 1s1-.448 1-1V9zm5 0C15.5 8.448 15.052 8 14.5 8s-1 .448-1 1v6c0 .552.448 1 1 1s1-.448 1-1V9z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-black ml-0.5">
                  <path d="M10.68 8.187C9.727 7.676 8.5 8.273 8.5 9.247v5.506c0 .974 1.227 1.571 2.18 1.06l5.139-2.753c.908-.487.908-1.826 0-2.313L10.68 8.187z" />
                </svg>
              )}
            </button>

            <button onClick={playNext} disabled={!currentSong} className="text-zinc-400 hover:text-white disabled:opacity-30 transition-colors">
              <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current">
                <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z" />
              </svg>
            </button>
          </div>

          {/* Right: Volume */}
          <div className="hidden sm:flex items-center gap-2 flex-1 justify-end">
            <svg viewBox="0 0 16 16" className="h-4 w-4 fill-zinc-400 flex-shrink-0">
              <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z" />
              <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z" />
            </svg>
            <input
              type="range" min={0} max={100}
              value={volume}
              onChange={(e) => handleVolume(Number(e.target.value))}
              className="w-24 h-1 accent-green-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerTrack;