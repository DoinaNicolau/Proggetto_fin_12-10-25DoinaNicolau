import { useState } from "react";
import { Link } from "react-router-dom";
import GenresDropdown from "./GenresDropdown";

export default function Sidebar({ onGenreSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Pulsante sempre visibile a lato */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded 
                    bg-[#E6D5B8]/70 backdrop-blur-md border border-white/30 
                    text-black shadow-md hover:bg-[#E6D5B8]/90 transition"
        onClick={() => setOpen(!open)}
        aria-label="Apri/chiudi menu"
        >
        {open ? "×" : "☰"}
      </button>

      <aside
        className={`fixed top-0 left-0 h-full w-64 p-4 pt-16 transform ${
            open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40
        bg-[#E6D5B8]/70 backdrop-blur-md border border-white/30 shadow-lg text-black`}
        aria-label="Sidebar di navigazione"
      >
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Menu</h2>
        </header>

        <nav>
          <ul className="space-y-4 mb-6">
            <li>
              <Link to="/" className="hover:text-yellow-700">
                Homepage
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-700">
                Profilo
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-700">
                Impostazioni
              </a>
            </li>
          </ul>

          <div className="mt-4">
            <h3 className="text-sm font-semibold mb-2">Filtra per genere</h3>
            <GenresDropdown onSelect={onGenreSelect} />
          </div>
        </nav>
      </aside>
    </>
  );
}
