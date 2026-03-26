import React from "react";
import { useMusic } from "../Context/MusicContext";

const PlayerTrack = () => {
  const {
    currentSong, isPlaying, progress, duration,
    volume, isLoading, togglePlay, playNext, playPrev,
    seek, changeVolume, formatTime,
  } = useMusic();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950 border-t border-zinc-800 h-20 sm:h-24 flex items-center px-3 sm:px-6 gap-2 sm:gap-4">

      {/* Left: Song Info */}
      <div className="flex items-center gap-3 w-[30%] min-w-0">
        {currentSong ? (
          <>
            <img
              src={currentSong.image || "https://via.placeholder.com/56"}
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-md object-cover flex-shrink-0 shadow-lg"
              alt={currentSong.name}
            />
            <div className="min-w-0 hidden sm:block">
              <p className="text-white text-sm font-semibold truncate">{currentSong.name}</p>
              <p className="text-zinc-400 text-xs truncate">{currentSong.artist}</p>
            </div>
          </>
        ) : (
          <div className="h-12 w-12 rounded-md bg-zinc-800 flex-shrink-0" />
        )}
      </div>

      {/* Center: Controls + Seekbar */}
      <div className="flex flex-col items-center gap-1 flex-1 min-w-0">
        {/* Buttons */}
        <div className="flex items-center gap-4 sm:gap-5">
          {/* Prev */}
          <button
            onClick={playPrev}
            className="text-zinc-400 hover:text-white transition-colors"
            title="Previous"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current">
              <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z" />
            </svg>
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            disabled={!currentSong || isLoading}
            className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : isPlaying ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-black">
                <path d="M10.5 9C10.5 8.44772 10.0523 8 9.5 8C8.94772 8 8.5 8.44772 8.5 9V15C8.5 15.5523 8.94772 16 9.5 16C10.0523 16 10.5 15.5523 10.5 15V9ZM15.5 9C15.5 8.44772 15.0523 8 14.5 8C13.9477 8 13.5 8.44772 13.5 9V15C13.5 15.5523 13.9477 16 14.5 16C15.0523 16 15.5 15.5523 15.5 15V9Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-black ml-0.5">
                <path d="M10.6804 8.1867C9.72723 7.6761 8.5 8.27305 8.5 9.24729V14.7527C8.5 15.727 9.72723 16.3239 10.6804 15.8133L15.8192 13.0606C16.7269 12.5743 16.7269 11.4257 15.8192 10.9394L10.6804 8.1867Z" />
              </svg>
            )}
          </button>

          {/* Next */}
          <button
            onClick={playNext}
            className="text-zinc-400 hover:text-white transition-colors"
            title="Next"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current">
              <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z" />
            </svg>
          </button>
        </div>

        {/* Seekbar */}
        <div className="flex items-center gap-2 w-full max-w-xs sm:max-w-md lg:max-w-xl">
          <span className="text-zinc-400 text-xs w-8 text-right flex-shrink-0">
            {formatTime((progress / 100) * duration)}
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => seek(Number(e.target.value))}
            className="flex-1 accent-green-500 h-1 cursor-pointer"
          />
          <span className="text-zinc-400 text-xs w-8 flex-shrink-0">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Right: Volume (hidden on mobile) */}
      <div className="hidden sm:flex items-center gap-2 w-[20%] justify-end">
        <svg viewBox="0 0 16 16" className="h-4 w-4 fill-zinc-400 flex-shrink-0">
          <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z" />
          <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z" />
        </svg>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(volume * 100)}
          onChange={(e) => changeVolume(Number(e.target.value))}
          className="w-24 accent-green-500 h-1 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PlayerTrack;