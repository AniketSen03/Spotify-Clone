import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const ArtistCard = ({ item, basePath, label }) => (
  <Link
    to={`/${basePath}/${item.id}`}
    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/5 transition-all group"
  >
    <div className="relative">
      <div className="h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 rounded-full overflow-hidden bg-zinc-700 flex-shrink-0">
        {item.images?.[0]?.url ? (
          <img
            src={item.images[0].url}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            alt={item.name}
          />
        ) : (
          <div className="h-full w-full bg-zinc-700 flex items-center justify-center text-3xl">🎵</div>
        )}
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-green-500 rounded-full p-2 shadow-xl translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-black">
            <path d="M10.6804 8.1867C9.72723 7.6761 8.5 8.27305 8.5 9.24729V14.7527C8.5 15.727 9.72723 16.3239 10.6804 15.8133L15.8192 13.0606C16.7269 12.5743 16.7269 11.4257 15.8192 10.9394L10.6804 8.1867Z" />
          </svg>
        </div>
      </div>
    </div>
    <div className="text-center w-full">
      <p className="text-white text-sm font-semibold truncate w-full px-1">
        {item.name.length > 14 ? item.name.slice(0, 12) + "..." : item.name}
      </p>
      <p className="text-zinc-500 text-xs">{label}</p>
    </div>
  </Link>
);

const Main = ({ artists, hero }) => {
  const [showAllArtists, setShowAllArtists] = useState(false);
  const [showAllHero, setShowAllHero] = useState(false);

  // 1 row = 7 items on lg, 5 on md, 4 on sm, 3 on mobile
  const FIRST_ROW = 7;

  const visibleArtists = showAllArtists ? artists : artists.slice(0, FIRST_ROW);
  const visibleHero = showAllHero ? hero : hero.slice(0, FIRST_ROW);

  return (
    <div className="bg-zinc-900 text-white w-full min-h-screen">

      {/* Popular Artists */}
      <section className="px-4 sm:px-6 pt-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Popular Artists</h1>
          {artists.length > FIRST_ROW && (
            <button
              className="text-zinc-400 text-sm font-semibold hover:text-white transition-colors"
              onClick={() => setShowAllArtists(p => !p)}
            >
              {showAllArtists ? "Show less" : "Show all"}
            </button>
          )}
        </div>

        {artists.length === 0 ? (
          <div className="flex gap-4 py-4">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="h-24 w-24 rounded-full bg-zinc-800 animate-pulse" />
                <div className="h-3 w-16 bg-zinc-800 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-2">
            {visibleArtists.map(artist => artist && (
              <ArtistCard key={artist.id} item={artist} basePath="Artist" label="Artist" />
            ))}
          </div>
        )}
      </section>

      {/* Popular Celebrities */}
      <section className="px-4 sm:px-6 pt-8 pb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Popular Celebrities</h1>
          {hero.length > FIRST_ROW && (
            <button
              className="text-zinc-400 text-sm font-semibold hover:text-white transition-colors"
              onClick={() => setShowAllHero(p => !p)}
            >
              {showAllHero ? "Show less" : "Show all"}
            </button>
          )}
        </div>

        {hero.length === 0 ? (
          <div className="flex gap-4 py-4">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="h-24 w-24 rounded-full bg-zinc-800 animate-pulse" />
                <div className="h-3 w-16 bg-zinc-800 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-2">
            {visibleHero.map(h => h && (
              <ArtistCard key={h.id} item={h} basePath="Hero" label="Celebrity" />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Main;