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
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        placeholder="Cerca un gioco..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 p-2 border rounded-l-md focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600"
      >
        Cerca
      </button>
    </form>
  );
}
