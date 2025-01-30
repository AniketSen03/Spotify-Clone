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
        "Lata Mangeshkar",
        "Kishore Kumar",
        "Shreya Ghoshal",
        "Yo Yo Honey Singh",
        "Pritam",
        "S.P",
        "A.R. Rahman",
        "Udit Narayan",
        "Abhijeet",
        "Kumar Sanu",
        "Sonu Nigam",
        "Rahat Fateh Ali Khan",
        "Mohammed Rafi",
        "Mukesh",
        "Anuradha",
        "Shaan",
        "Shankar m",
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
        "rashmika mandanna",
        "Salman",
        "Akshay kumar",
        "Alia ",
        "Rajesh Khanna",
        "Amitabh",
        "Amir k",
        "Deepika p",
        "priyanka c",
        "ranveer kapoor",
        "rishi kapoor",
        "hema malini",
        "dharmendr",
        "sanjay dutt",
        "anil kapoor",
        "ajay d",
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
      <div className="h-16 bg-black text-white flex justify-evenly">
        <img src="src/assets/Logo.png" alt="" />
        <div>
          <h1>chand taare</h1>
          <h1>abhijeet</h1>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex h-7 ">
            <svg data-encore-id="icon" role="img" aria-hidden="true" class="h-7 invert Svg-sc-ytk21e-0 dYnaPI e-9541-icon" viewBox="0 0 16 16"><path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z"></path><path d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z"></path></svg>
            <svg data-encore-id="icon" role="img" aria-hidden="true" class="invert Svg-sc-ytk21e-0 dYnaPI e-9541-icon" viewBox="0 0 16 16"><path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path></svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-9 h-9 injected-svg" data-src="https://cdn.hugeicons.com/icons/play-circle-solid-standard.svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#1ed760">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM10.6804 8.1867C9.72723 7.6761 8.5 8.27305 8.5 9.24729V14.7527C8.5 15.727 9.72723 16.3239 10.6804 15.8133L15.8192 13.0606C16.7269 12.5743 16.7269 11.4257 15.8192 10.9394L10.6804 8.1867Z" fill="#1ed760"></path>
            </svg>
            <svg data-encore-id="icon" role="img" aria-hidden="true" class="invert Svg-sc-ytk21e-0 dYnaPI e-9541-icon" viewBox="0 0 16 16"><path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path></svg>
            <svg data-encore-id="icon" role="img" aria-hidden="true" class=" invert Svg-sc-ytk21e-0 dYnaPI e-9541-icon" viewBox="0 0 16 16"><path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"></path></svg>
          </div>
          <div>
          <input type="range" min={0} max={100}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
