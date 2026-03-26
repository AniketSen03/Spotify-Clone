import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Main = ({ artists, hero }) => {
  const [showAllArtists, setShowAllArtists] = useState(false);
  const [showAllHero, setShowAllHero] = useState(false);

  return (
    <div className="bg-zinc-900 text-white w-full min-h-screen">
      {/* Popular Artists */}
      <section className="px-4 sm:px-6 pt-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Popular Artists</h1>
          <button
            className="text-zinc-400 text-sm font-semibold hover:text-white transition-colors"
            onClick={() => setShowAllArtists((p) => !p)}
          >
            {showAllArtists ? "Show less" : "Show all"}
          </button>
        </div>
        <div className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4 ${!showAllArtists ? "max-h-[200px] sm:max-h-[220px] overflow-hidden" : ""}`}>
          {artists.map(
            (artist) =>
              artist && (
                <Link
                  to={`/Artist/${artist.id}`}
                  key={artist.id}
                  className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <div className="relative">
                    <img
                      src={artist.images?.[0]?.url || "https://via.placeholder.com/150"}
                      className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 rounded-full object-cover group-hover:brightness-75 transition-all"
                      alt={artist.name}
                    />
                    {/* Play button on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-green-500 rounded-full p-1.5 shadow-xl">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-black">
                          <path d="M10.6804 8.1867C9.72723 7.6761 8.5 8.27305 8.5 9.24729V14.7527C8.5 15.727 9.72723 16.3239 10.6804 15.8133L15.8192 13.0606C16.7269 12.5743 16.7269 11.4257 15.8192 10.9394L10.6804 8.1867Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="text-center min-w-0 w-full">
                    <p className="text-xs sm:text-sm font-semibold truncate">
                      {artist.name.length > 12 ? `${artist.name.slice(0, 10)}...` : artist.name}
                    </p>
                    <p className="text-zinc-500 text-xs">Artist</p>
                  </div>
                </Link>
              )
          )}
        </div>
      </section>

      {/* Popular Celebrities */}
      <section className="px-4 sm:px-6 pt-8 pb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Popular Celebrities</h1>
          <button
            className="text-zinc-400 text-sm font-semibold hover:text-white transition-colors"
            onClick={() => setShowAllHero((p) => !p)}
          >
            {showAllHero ? "Show less" : "Show all"}
          </button>
        </div>
        <div className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4 ${!showAllHero ? "max-h-[200px] sm:max-h-[220px] overflow-hidden" : ""}`}>
          {hero.map(
            (h) =>
              h && (
                <Link
                  to={`/Hero/${h.id}`}
                  key={h.id}
                  className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <div className="relative">
                    <img
                      src={h.images?.[0]?.url || "https://via.placeholder.com/150"}
                      className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 rounded-full object-cover group-hover:brightness-75 transition-all"
                      alt={h.name}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-green-500 rounded-full p-1.5 shadow-xl">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-black">
                          <path d="M10.6804 8.1867C9.72723 7.6761 8.5 8.27305 8.5 9.24729V14.7527C8.5 15.727 9.72723 16.3239 10.6804 15.8133L15.8192 13.0606C16.7269 12.5743 16.7269 11.4257 15.8192 10.9394L10.6804 8.1867Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="text-center min-w-0 w-full">
                    <p className="text-xs sm:text-sm font-semibold truncate">
                      {h.name.length > 12 ? `${h.name.slice(0, 10)}...` : h.name}
                    </p>
                    <p className="text-zinc-500 text-xs">Celebrity</p>
                  </div>
                </Link>
              )
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Main;