import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../App.css'
import Footer from "./Footer";

const Main = ({ artists, hero }) => {
  const [toggle1, settoggle1] = useState(true)
  const [toggle2, settoggle2] = useState(true)
  return (<>
    <div className="bg-primary mx-5 text-white w-[80%] main">
      <div className="flex justify-between items-center align-box">
        <h1 className="text-3xl my-4 mx-5 heading">Popular Artists</h1>
        <button className="my-4 mx-5 subheading" onClick={() => settoggle1(prev => prev === true ? false : true)}>{toggle1 ? 'Show all' : 'Show less'}</button>
      </div>
      <div className={`${toggle1 ? 'flex flex-wrap justify-evenly bg-primary h-[13em] overflow-hidden' : 'flex flex-wrap justify-evenly bg-primary '}`} >
        {artists.map(
          (artist) =>
            artist && (
              <Link
                to={`/Artist/${artist.id}`}
                key={artist.id}
                className="m-3 flex flex-col justify-evenly relative z-0">
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" className="bg-black rounded-full absolute right-0 bottom-12 injected-svg" data-src="https://cdn.hugeicons.com/icons/play-circle-solid-standard.svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" color="#1ed760">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM10.6804 8.1867C9.72723 7.6761 8.5 8.27305 8.5 9.24729V14.7527C8.5 15.727 9.72723 16.3239 10.6804 15.8133L15.8192 13.0606C16.7269 12.5743 16.7269 11.4257 15.8192 10.9394L10.6804 8.1867Z" fill="#1ed760"></path>
                </svg> */}
                <img
                  src={artist.images?.[0]?.url || "https://via.placeholder.com/150"}
                  className="h-36 w-36 rounded-full"
                  alt={artist.name}
                />
                <h1 className="text-lg font-bold">
                  {artist.name.length > 15 ? `${artist.name.slice(0, 10)}...` : artist.name}
                </h1>
                <h1 className="text-sm text-zinc-500">Artist</h1>
              </Link>
            )
        )}
      </div>

      <div className="flex justify-between item-center align-box">
        <h1 className="text-3xl my-4 mx-5 heading ">Popular Celebrities</h1>
        <button className="my-4 mx-5 subheading" onClick={() => { settoggle2(prev => prev === false ? true : false) }}>{toggle2 ? 'Show all' : 'Show less'}</button>
      </div>
      <div className={`${toggle2 ? "flex flex-wrap justify-evenly bg-primary h-[13em] overflow-hidden" : "flex flex-wrap justify-evenly bg-primary "}`}>
        {hero.map(
          (hero) =>
            hero && (
              <Link
                to={`/Hero/${hero.id}`}
                key={hero.id}
                className="m-3 flex flex-col justify-evenly"
              >
                <img
                  src={hero.images?.[0]?.url || "https://via.placeholder.com/150"}
                  className="h-36 w-36 rounded-full"
                  alt={hero.name}
                />
                <h1 className="text-lg font-bold">
                  {hero.name.length > 15 ? `${hero.name.slice(0, 10)}...` : hero.name}
                </h1>
                <h1 className="text-sm text-zinc-500">Celebrities</h1>
              </Link>
            )
        )}

      </div>
      <Footer />
    </div>
{/* 
    <iframe
      src="https://open.spotify.com/embed/track/4uLU6hMCjMI75M1A2tKUQC?theme=0"
      width="100%"
      height="80"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media" className="fixed bottom-0">
    </iframe> */}

    

  </>

  );
};

export default Main;
