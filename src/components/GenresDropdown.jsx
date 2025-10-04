import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import useFetchSolution from "../hooks/useFetchSolution";

export default function GenresDropdown({ onSelect }) {
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;
  const initialUrl = `https://api.rawg.io/api/genres?key=${apiKey}`;

  const { data, loading, error } = useFetchSolution(initialUrl);

  const handleChange = (genre) => {
    if (onSelect) onSelect(genre.slug);
    navigate(`/games/${genre.slug}`);
  };

  return (
    <div className="w-full">
      {loading && <p className="text-sm text-gray-400">Caricamento generi...</p>}
      {error && <p className="text-red-500">Errore: {error}</p>}

      {data?.results && (
        <Listbox value={null} onChange={handleChange}>
          <div className="relative">
            {/* Bottone dropdown */}
             <Listbox.Button
              className="
                relative w-full cursor-pointer rounded-md 
                bg-gray-800 text-white border border-gray-700 
                py-2 px-3 text-left font-medium
                focus:outline-none focus:ring-2 focus:ring-red-500 
                transition-colors hover:bg-gray-700
              "
            >
              <span className="block truncate">🎮 Seleziona un genere</span>
            </Listbox.Button>

            {/* Lista dropdown */}
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className="
                  absolute left-0 mt-1 w-full rounded-md 
                  bg-gray-800 text-white shadow-xl 
                  ring-1 ring-gray-700 focus:outline-none z-20
                  max-h-60 overflow-y-auto 
                  // CLASSE AGGIUNTA PER NASCONDERE LA SCROLLBAR
                  hide-scrollbar
                "
              >
                {data.results.map((genre) => (
                  <Listbox.Option
                    key={genre.id}
                    value={genre}
                    className={({ active }) =>
                      `cursor-pointer select-none py-2 pl-3 pr-3 rounded-md transition-colors ${
                        active
                          ? "bg-red-600 text-white" 
                          : "text-gray-300 hover:bg-gray-700"
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