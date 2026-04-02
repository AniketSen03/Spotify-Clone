import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Aside from "./Components/Aside";
import Main from "./Components/Main";
import { Route, Routes } from "react-router-dom";
import Artist from "./Components/Artist";
import Hero from "./Components/Hero";
import PlayerTrack from "./Components/PlayerTrack";
import { MusicProvider } from "./Context/MusicContext";

const LASTFM_KEY = "b766b983744bdb7458c72d5949eeddcc";
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Last.fm se artist info + Wikipedia se image
const fetchArtistData = async (name) => {
  try {
    // Last.fm se info
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(name)}&api_key=${LASTFM_KEY}&format=json`
    );
    const data = await res.json();
    const a = data?.artist;
    if (!a) return null;

    // Last.fm image check karo pehle
    const lfmImages = a.image || [];
    let imgUrl = lfmImages.find(i => i.size === "extralarge")?.["#text"] || "";

    // Agar Last.fm image blank hai toh Wikipedia se lo
    if (!imgUrl || imgUrl.includes("2a96cbd8b46e442fc41c2b86b821562f")) {
      try {
        const wikiRes = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`
        );
        const wikiData = await wikiRes.json();
        imgUrl = wikiData?.thumbnail?.source || "";
      } catch {
        imgUrl = "";
      }
    }

    return {
      id: a.name,
      name: a.name,
      images: [{ url: imgUrl }],
      followers: { total: parseInt(a.stats?.listeners || 0) },
    };
  } catch {
    return null;
  }
};

const fetchInBatches = async (names) => {
  const results = [];
  for (let i = 0; i < names.length; i += 3) {
    const batch = names.slice(i, i + 3);
    const batchResults = await Promise.all(batch.map(fetchArtistData));
    results.push(...batchResults);
    if (i + 3 < names.length) await delay(200);
  }
  return results.filter(Boolean);
};

function App() {
  const [artists, setArtists] = useState([]);
  const [hero, sethero] = useState([]);

  const ARTISTS = [
    "Arijit Singh", "Lata Mangeshkar", "Kishore Kumar",
    "Shreya Ghoshal", "Yo Yo Honey Singh", "Udit Narayan",
   "Atif Aslam", "Guru Randhawa", "A.R. Rahman", "Abhijeet Bhattacharya",
    "Kumar Sanu", "Sonu Nigam","Alka Yagnik", "Rahat Fateh Ali Khan",
    "Mohammed Rafi", "Nusrat Fateh Ali Khan", "Anuradha Paudwal",
    "Shaan", "Shankar Mahadevan", "Neha Kakkar","S.P. Balasubrahmanyam","Jubin Nautiyal","Armaan Malik"
  ];

  const CELEBRITIES = [
    "Amitabh Bachchan","Rashmika Mandanna","Shah Rukh Khan", "Salman Khan",
    "Akshay Kumar", "Alia Bhatt", "Rajesh Khanna","Deepika Padukone",
    "Priyanka Chopra", "Ranveer Singh", "Hema Malini","Ajay Devgn",
    "Katrina Kaif", "Hrithik Roshan", "Kareena Kapoor",
    "Ranbir Kapoor", "Anushka Sharma","Shahid Kapoor","Kiara Advani","Kartik Aaryan", "Vidya Balan",
    "Taapsee Pannu", "Ayushmann Khurrana", "Vicky Kaushal",
  ];

  useEffect(() => {
    fetchInBatches(ARTISTS).then(setArtists);
  }, []);

  useEffect(() => {
    fetchInBatches(CELEBRITIES).then(sethero);
  }, []);

  return (
    <MusicProvider>
      <div className="flex flex-col min-h-screen bg-black">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <div className="hidden lg:block flex-shrink-0">
            <Aside />
          </div>
          <main className="flex-1 overflow-y-auto pb-24">
            <Routes>
              <Route path="/" element={<Main artists={artists} hero={hero} />} />
              <Route path="/Artist/:id" element={<Artist artists={artists} />} />
              <Route path="/Hero/:id" element={<Hero artists={hero} />} />
            </Routes>
          </main>
        </div>
        <PlayerTrack />
      </div>
    </MusicProvider>
  );
}

export default App;