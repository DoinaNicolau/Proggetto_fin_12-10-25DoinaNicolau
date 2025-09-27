import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import useFetchSolution from "../hooks/useFetchSolution";

export default function GenresDropdown({ onSelect }) {
  const navigate = useNavigate();

  const apiKey = import.meta.env.VITE_API_KEY;
  const initialUrl = `https://api.rawg.io/api/genres?key=${apiKey}`;
  
  // Uso del custom hook
  const { data, loading, error } = useFetchSolution(initialUrl);

  const handleChange = (genre) => {
    if (onSelect) onSelect(genre.slug);
    navigate(`/games/${genre.slug}`);
  };

  return (
    <div className="w-full">
      {loading && <p>Loading genres...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      
      {data?.results && (
        <Listbox value={null} onChange={handleChange}>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-transparent border border-gray-400 py-2 px-3 text-left focus:outline-none focus:ring-2 focus:ring-[#B8A382]">
              <span className="block truncate">
                Seleziona un genere
              </span>
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute left-0 mt-1 w-full rounded-md bg-[#CBB79E]/90 backdrop-blur-md text-black shadow-md ring-1 ring-black/5 focus:outline-none z-20">
                {data.results.map((genre) => (
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
