import { useState, useEffect, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

export default function GenresDropdown({ onSelect }) {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  const apiKey = import.meta.env.VITE_API_KEY;
  const initialUrl = `https://api.rawg.io/api/genres?key=${apiKey}`;

  const load = async () => {
    try {
      const response = await fetch(initialUrl);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      setGenres(json.results);
    } catch (error) {
      setError(error.message);
      setGenres([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (genre) => {
    setSelected(genre);
    if (onSelect) onSelect(genre.slug);
  };

  return (
    <div className="w-full">
      {error && <p className="text-red-600">Error: {error}</p>}
      {!error && genres.length === 0 && <p>Loading genres...</p>}
      {genres.length > 0 && (
        <Listbox value={selected} onChange={handleChange}>
          <div className="relative">
            {/* Etichetta "inline" più pulita */}
            <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-transparent border border-gray-400 py-2 px-3 text-left focus:outline-none focus:ring-2 focus:ring-[#B8A382]">
              <span className="block truncate">
                {selected ? selected.name : "Seleziona un genere"}
              </span>
            </Listbox.Button>

            {/* Tendina allineata alla sidebar */}
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute left-0 mt-1 w-full rounded-md bg-[#CBB79E]/90 backdrop-blur-md text-black shadow-md ring-1 ring-black/5 focus:outline-none z-20">
                {genres.map((genre) => (
                    <Listbox.Option
                    key={genre.id}
                    value={genre}
                    className={({ active }) =>
                        `cursor-pointer select-none py-2 pl-3 pr-3 rounded ${
                        active ? "bg-[#B8A382] text-white" : "text-black"
                        }`
                    }
                    >
                    {genre.name}
                    </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      )}
    </div>
  );
}
