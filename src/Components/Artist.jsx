import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "./Footer";

const Artist = ({ artists, tokenfetch }) => {
  const { id } = useParams();
  const artist = artists.find((artist) => artist?.id === id);
  const [songs, setSongs] = useState([]);
  const [color, setcolor] = useState('')

  const fetchArtistSongs = async () => {
    try {
      const token = tokenfetch;
      const topTracksResponse = await fetch(
        `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const topTracksData = await topTracksResponse.json();
      setSongs(topTracksData.tracks || []);
    } catch (error) {
      console.error("Error fetching artist's songs:", error);
    }
  };

  useEffect(() => {
    const randomcolors = () => {
      const choice = ['bg-red-600', 'bg-pink-600', 'bg-lime-600','bg-stone-600', 'bg-green-600','bg-cyan-600', 'bg-sky-600', 'bg-orange-600', 'bg-yellow-600', 'bg-blue-600', 'bg-purple-600'];
      const random = Math.floor(Math.random() * choice.length); // Ensure index is valid
      const selectedColor = choice[random]; // Get random color
      setcolor(selectedColor);
    };
    
    randomcolors();
    if (tokenfetch) fetchArtistSongs();
  }, [id, tokenfetch]);





  return (
    <div className="bg-primary mx-5 text-white w-[80%]">
      <div className={`flex flex-wrap justify-between ${color}`}>
        <div className="m-3 flex h-56">
          <img
            src={artist?.images?.[0]?.url || "https://via.placeholder.com/150"}
            className="h-56 w-56 rounded-full"
            alt={artist?.name}
          />
          <div className="flex flex-col justify-evenly ml-9">
            <h1 className="text-7xl font-bold">{artist?.name}</h1>
            <h1 className="text-sm text-zinc-200">
              {artist?.followers?.total.toLocaleString() || "N/A"} monthly listeners
            </h1>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-bold m-5">Popular</h1>
        {songs.map((song, index) => (
          <div key={song.id} className="flex justify-between items-center mx-6">
            <div className="flex items-center my-2">
              <span className="text-zinc-500 font-semibold w-2">{index + 1}</span>
              <img
                src={song.album?.images?.[0]?.url || "https://via.placeholder.com/150"}
                className="h-12 w-12 rounded-md mx-4"
                alt={song.name}
              />
              <span className="font-semibold w-96">{song.name}</span>
            </div>
            <span className="text-zinc-500 font-semibold">
              {Math.round(song.popularity * 10000000).toLocaleString()}
            </span>


            <span className="text-zinc-500 font-semibold">
              {Math.floor(song.duration_ms / 60000)}:{String(Math.floor((song.duration_ms % 60000) / 1000)).padStart(2, '0')}
            </span>

          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default Artist;
