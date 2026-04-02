import React, { createContext, useContext, useState } from "react";

const MusicContext = createContext();
const YT_KEY = "AIzaSyCglL_RPgBVk3WLkzrKR_6ismBrWQwPWIk";

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState([]);
  const [queueIndex, setQueueIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const searchYouTube = async (songName, artistName) => {
    try {
      const query = `${songName} ${artistName} full song`;
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=1&key=${YT_KEY}`
      );
      const data = await res.json();
      if (data.error) {
        console.error("YouTube API error:", data.error.message);
        return null;
      }
      return data?.items?.[0]?.id?.videoId || null;
    } catch (e) {
      console.error("YouTube search failed:", e);
      return null;
    }
  };

  const playSong = async (song, songQueue = [], index = 0) => {
    setIsLoading(true);
    if (songQueue.length > 0) {
      setQueue(songQueue);
      setQueueIndex(index);
    }
    setCurrentSong(song);
    setVideoId(null);
    const vid = await searchYouTube(song.name, song.artist);
    setVideoId(vid);
    setIsPlaying(true);
    setIsLoading(false);
  };

  const playNext = () => {
    if (queue.length === 0) return;
    const next = (queueIndex + 1) % queue.length;
    setQueueIndex(next);
    playSong(queue[next], queue, next);
  };

  const playPrev = () => {
    if (queue.length === 0) return;
    const prev = (queueIndex - 1 + queue.length) % queue.length;
    setQueueIndex(prev);
    playSong(queue[prev], queue, prev);
  };

  const togglePlay = () => setIsPlaying(p => !p);

  return (
    <MusicContext.Provider value={{
      currentSong, isPlaying, isLoading,
      queue, queueIndex, videoId,
      playSong, togglePlay, playNext, playPrev,
    }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);