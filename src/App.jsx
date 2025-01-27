import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import Aside from "./Components/Aside";
import Main from "./Components/Main";
import { Route, Routes } from "react-router-dom";
import Artist from "./Components/Artist";
import Hero from "./Components/Hero";

function App() {
  const [artists, setArtists] = useState([]); // State to store artist data
  const [hero, sethero] = useState([]); // State to store celebrity data
  const [tokenfetch, settokenfetch] = useState("");

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
        // console.log("Access Token:", data.access_token);
      } catch (error) {
        console.error("Error fetching Spotify token:", error);
      }
    };

    getSpotifyToken();
  }, []);

  const searchForArtists = async (artistNames) => {
    try {
      const results = await Promise.all(
        artistNames.map(async (artistName) => {
          const response = await fetch(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`,
            {
              headers: {
                Authorization: `Bearer ${tokenfetch}`,
              },
            }
          );
          const data = await response.json();
          return data.artists?.items?.[0]; // Take the first result for each artist
        })
      );
      setArtists(results.filter(Boolean)); // Filter out null/undefined values
    } catch (error) {
      console.error("Error fetching artist data:", error);
    }
  };

  useEffect(() => {
    if (tokenfetch) {
      searchForArtists([
        "Arijit Singh",
        "Kishore Kumar",
        "Lata Mangeshkar",
        "Pritam",
        "S.P",
        "A.R. Rahman",
        "Shreya Ghoshal",
        "Udit Narayan",
        "Abhijeet",
        "Kumar Sanu",
        "Sonu Nigam",
        "Rahat Fateh Ali Khan",
        "Yo Yo Honey Singh",
        "Mohammed Rafi",
        "Mukesh",
        "Anuradha",
        "Shaan",
        "Shankar",
      ]);
    }
  }, [tokenfetch]); // Run when token is fetched


  const searchForHero = async (artistNames) => {
    try {
      const results = await Promise.all(
        artistNames.map(async (artistName) => {
          const response = await fetch(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`,
            {
              headers: {
                Authorization: `Bearer ${tokenfetch}`,
              },
            }
          );
          const data = await response.json();
          return data.artists?.items?.[0]; // Take the first result for each artist
        })
      );
      sethero(results.filter(Boolean)); // Filter out null/undefined values
    } catch (error) {
      console.error("Error fetching artist data:", error);
    }
  };

  useEffect(() => {
    if (tokenfetch) {
      searchForHero([
        "SRK",
        "Salman",
        "rashmika mandanna",
        "Akshay",
        "Amitabh",
        "Rajesh Khanna",
        "Alia bhatt",
        "Amir Khan",
        "Deepika",
        "priyanka c",
        "ranveer kapoor",
        "rishi kapoor",
        "hema malini",
        "dharmendra",
        "sanjay dutt",
        "anil kapoor",
        "ajay devgan",
        "shahid k",
      ]);
    }
  }, [tokenfetch]); // Run when token is fetched


  return (
    <>
      <Header />
      <div className="flex justify-around">
        <Aside />
        <Routes>
          <Route path="/" element={<Main artists={artists} hero={hero} />} />
          <Route path="/Artist/:id" element={<Artist artists={artists} tokenfetch={tokenfetch} />} />
          <Route path="/Hero/:id" element={<Hero artists={hero} tokenfetch={tokenfetch} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
