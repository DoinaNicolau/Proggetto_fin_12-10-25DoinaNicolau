import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Searchbar() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/search?query=${encodeURIComponent(input.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md mx-auto bg-white/70 backdrop-blur-md rounded-lg shadow-md overflow-hidden"
    >
      <label htmlFor="search" className="sr-only">Cerca un gioco</label>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Cerca un gioco..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 p-3 text-gray-800 placeholder-gray-500 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-yellow-400 to-[#F5E8C7] text-black font-semibold px-4 hover:from-yellow-500 hover:to-[#F5E8C7]/90 transition"
      >
        Cerca
      </button>
    </form>
  );
}
