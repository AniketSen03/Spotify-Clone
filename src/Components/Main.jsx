import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../App.css'
import Footer from "./Footer";

const Main = ({ artists, hero }) => {
  const [toggle1, settoggle1] = useState(true)
  const [toggle2, settoggle2] = useState(true)
  return (
    <div className="bg-primary mx-5 text-white w-[80%] main">
      <div className="flex justify-between items-center align-box">
        <h1 className="text-3xl my-4 mx-5 heading">Popular Artists</h1>
        <button className="my-4 mx-5 subheading" onClick={() => settoggle1(prev => prev === true ? false : true)}>{toggle1? 'Show all' : 'Show less'}</button>
      </div>
      <div className={`${toggle1 ? 'flex flex-wrap justify-evenly bg-primary h-[13em] overflow-hidden' : 'flex flex-wrap justify-evenly bg-primary '}`} >
        {artists.map(
          (artist) =>
            artist && (
              <Link
                to={`/Artist/${artist.id}`}
                key={artist.id}
                className="m-3 flex flex-col justify-evenly"
              >
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
        <button className="my-4 mx-5 subheading" onClick={() => { settoggle2(prev => prev === false ? true : false) }}>{toggle2?'Show all':'Show less'}</button>
      </div>
      <div className={`${toggle2?"flex flex-wrap justify-evenly bg-primary h-[13em] overflow-hidden":"flex flex-wrap justify-evenly bg-primary "}`}>
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
      <Footer/>
    </div>


  );
};

export default Main;
