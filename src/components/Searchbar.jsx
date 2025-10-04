import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Icona Lente d'Ingrandimento
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

export default function Searchbar() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/search?query=${encodeURIComponent(input.trim())}`);
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
  
      className="relative w-full max-w-xs" 
    >
      <label htmlFor="search" className="sr-only">Cerca un gioco</label>
      
      {/* Icona posizionata a sinistra dentro l'input */}
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <SearchIcon />
      </div>

      <input
        type="text"
        id="search"
        name="search"
        placeholder="Cerca un gioco..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
 
        className="w-full pl-10 pr-4 py-2 rounded-md bg-card-bg border border-secondary/30 text-primary placeholder-secondary/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
      />
    </form>
  );
}