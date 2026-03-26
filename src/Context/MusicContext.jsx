import React, { createContext, useContext, useRef, useState, useEffect } from "react";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [queue, setQueue] = useState([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Search JioSaavn for a song and return the stream URL
  const searchJioSaavn = async (songName, artistName) => {
    try {
      const query = `${songName} ${artistName}`.trim();
      const res = await fetch(
        `https://saavn.dev/api/search/songs?query=${encodeURIComponent(query)}&limit=1`
      );
      const data = await res.json();
      const song = data?.data?.results?.[0];
      if (!song) return null;

      // Pick highest quality download URL
      const urls = song.downloadUrl;
      const best = urls?.find(u => u.quality === "320kbps") ||
                   urls?.find(u => u.quality === "160kbps") ||
                   urls?.[urls.length - 1];
      return best?.url || null;
    } catch (err) {
      console.error("JioSaavn search failed:", err);
      return null;
    }
  };

  // Play a song object: { name, artist, image, spotifyId }
  const playSong = async (song, songQueue = [], index = 0) => {
    setIsLoading(true);
    if (songQueue.length > 0) {
      setQueue(songQueue);
      setQueueIndex(index);
    }

    const streamUrl = await searchJioSaavn(song.name, song.artist);
    if (!streamUrl) {
      console.warn("No stream URL found for:", song.name);
      setIsLoading(false);
      return;
    }

    const audio = audioRef.current;
    audio.src = streamUrl;
    audio.volume = volume;
    audio.play();
    setCurrentSong({ ...song, streamUrl });
    setIsPlaying(true);
    setIsLoading(false);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (queue.length === 0) return;
    const nextIndex = (queueIndex + 1) % queue.length;
    setQueueIndex(nextIndex);
    playSong(queue[nextIndex], queue, nextIndex);
  };

  const playPrev = () => {
    if (queue.length === 0) return;
    const prevIndex = (queueIndex - 1 + queue.length) % queue.length;
    setQueueIndex(prevIndex);
    playSong(queue[prevIndex], queue, prevIndex);
  };

  const seek = (val) => {
    const audio = audioRef.current;
    if (audio.duration) {
      audio.currentTime = (val / 100) * audio.duration;
      setProgress(val);
    }
  };

  const changeVolume = (val) => {
    audioRef.current.volume = val / 100;
    setVolume(val / 100);
  };

  useEffect(() => {
    const audio = audioRef.current;

    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setDuration(audio.duration);
      }
    };
    const onEnded = () => {
      playNext();
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [queue, queueIndex]);

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <MusicContext.Provider value={{
      currentSong, isPlaying, progress, duration,
      volume, isLoading, queue, queueIndex,
      playSong, togglePlay, playNext, playPrev,
      seek, changeVolume, formatTime
    }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);