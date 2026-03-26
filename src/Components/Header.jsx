import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ tokenfetch }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // You can extend this to a /search route later
  };

  return (
    <div className="flex items-center justify-between px-3 sm:px-6 h-14 sm:h-16 bg-zinc-950 sticky top-0 z-40 border-b border-zinc-800">
      {/* Logo */}
      <img
        src="src/assets/Logo.png"
        alt="Logo"
        className="h-8 sm:h-10 flex-shrink-0"
      />

      {/* Search bar - hidden on very small screens, shown on sm+ */}
      <form
        onSubmit={handleSearch}
        className="hidden sm:flex items-center bg-zinc-800 rounded-full px-4 py-2 gap-2 w-[40%] max-w-md focus-within:ring-2 focus-within:ring-white transition-all"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-zinc-400 flex-shrink-0">
          <path d="M10.533 1.27893C5.35215 1.27893 1.12598 5.41887 1.12598 10.5579C1.12598 15.697 5.35215 19.8369 10.533 19.8369C12.767 19.8369 14.8235 19.0671 16.4402 17.7794L20.7929 22.132C21.1834 22.5226 21.8166 22.5226 22.2071 22.132C22.5976 21.7415 22.5976 21.1083 22.2071 20.7178L17.8634 16.3741C19.1616 14.7849 19.94 12.7634 19.94 10.5579C19.94 5.41887 15.7138 1.27893 10.533 1.27893ZM3.12598 10.5579C3.12598 6.55226 6.42768 3.27893 10.533 3.27893C14.6383 3.27893 17.94 6.55226 17.94 10.5579C17.94 14.5636 14.6383 17.8369 10.533 17.8369C6.42768 17.8369 3.12598 14.5636 3.12598 10.5579Z" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-zinc-500"
          placeholder="What do you want to play?"
        />
      </form>

      {/* Avatar */}
      <div className="h-9 w-9 rounded-full bg-green-500 flex items-center justify-center font-bold text-black text-sm flex-shrink-0">
        A
      </div>
    </div>
  );
};

export default Header;