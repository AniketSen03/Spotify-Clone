import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Aside from "./Components/Aside";
import Main from "./Components/Main";
import { Route, Routes } from "react-router-dom";
import Artist from "./Components/Artist";
import Hero from "./Components/Hero";
import PlayerTrack from "./Components/PlayerTrack";
import { MusicProvider } from "./Context/MusicContext";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function App() {
  const [artists, setArtists] = useState([]);
  const [hero, sethero] = useState([]);
  const [tokenfetch, settokenfetch] = useState("");

  // Token fetch + auto refresh every 50 min
  useEffect(() => {
    const getSpotifyToken = async () => {
      try {
        const clientId = "edb5f928a4f84d8183d9da98dd9c5dac";
        const clientSecret = "d8442986e13e49d7b01395523f9e05a1";
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: "grant_type=client_credentials",
        });
        const data = await response.json();
        settokenfetch(data.access_token);
      } catch (error) {
        console.error("Error fetching Spotify token:", error);
      }
    };

    getSpotifyToken();
    const interval = setInterval(getSpotifyToken, 50 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Batch fetch helper — 3 requests at a time with 300ms gap
  const fetchInBatches = async (names, token) => {
    const results = [];
    for (let i = 0; i < names.length; i += 3) {
      const batch = names.slice(i, i + 3);
      const batchResults = await Promise.all(
        batch.map(async (name) => {
          try {
            const res = await fetch(
              `https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=artist`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            if (!res.ok) return null;
            const data = await res.json();
            return data.artists?.items?.[0] || null;
          } catch {
            return null;
          }
        })
      );
      results.push(...batchResults);
      if (i + 3 < names.length) await delay(300);
    }
    return results.filter(Boolean);
  };

  useEffect(() => {
    if (!tokenfetch) return;

    fetchInBatches([
      "Arijit Singh", "Lata Mangeshkar", "Kishore Kumar",
      "Shreya Ghoshal", "Yo Yo Honey Singh", "Udit Narayan",
      "Guru Randhawa", "S.P. Balasubrahmanyam", "A.R. Rahman",
      "Abhijeet Bhattacharya", "Kumar Sanu", "Sonu Nigam",
      "Rahat Fateh Ali Khan", "Mohammed Rafi", "Nusrat Fateh Ali Khan",
      "Anuradha Paudwal", "Shaan", "Shankar Mahadevan",
    ], tokenfetch).then(setArtists);

  }, [tokenfetch]);

  useEffect(() => {
    if (!tokenfetch) return;

    fetchInBatches([
      "Amitabh Bachchan", "Shah Rukh Khan", "Rajesh Khanna",
      "Rashmika Mandanna", "Salman Khan", "Akshay Kumar",
      "Alia Bhatt", "Aamir Khan", "Deepika Padukone",
      "Priyanka Chopra", "Ranveer Singh", "Rishi Kapoor",
      "Hema Malini", "Dharmendra", "Sanjay Dutt",
      "Anil Kapoor", "Ajay Devgn", "Shashi Kapoor",
    ], tokenfetch).then(sethero);

  }, [tokenfetch]);

  return (
    <MusicProvider>
      <div className="flex flex-col min-h-screen bg-black">
        <Header tokenfetch={tokenfetch} />
        <div className="flex flex-1 overflow-hidden">
          <div className="hidden lg:block flex-shrink-0">
            <Aside />
          </div>
          <main className="flex-1 overflow-y-auto pb-24">
            <Routes>
              <Route path="/" element={<Main artists={artists} hero={hero} />} />
              <Route path="/Artist/:id" element={<Artist artists={artists} tokenfetch={tokenfetch} />} />
              <Route path="/Hero/:id" element={<Hero artists={hero} tokenfetch={tokenfetch} />} />
            </Routes>
          </main>
        </div>
        <PlayerTrack />
      </div>
    </MusicProvider>
  );
}

export default App;