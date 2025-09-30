import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Card from "../../components/Card";
import useFetchSolution from "../../hooks/useFetchSolution";

export default function HomePage() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const initialUrl = `https://api.rawg.io/api/games?key=${apiKey}&dates=2024-01-01,2024-12-31&page=1`;

  const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);


  const { selectedGenre } = useOutletContext();


  useEffect(() => {
    if (selectedGenre) {
      const url = `https://api.rawg.io/api/games?key=${apiKey}&genres=${selectedGenre}&page=1`;
      updateUrl(url);
    }
  }, [selectedGenre]);

  return (
    <main className="p-8 bg-[#F5E8C7] min-h-screen">
      {/* errore fetch RAWG */}
      {error && (
        <p className="text-red-600 text-center bg-white/60 backdrop-blur-md p-4 rounded-lg shadow mb-6">
          Error: {error}
        </p>
      )}

      {/* giochi RAWG */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center">
        {loading && <p>Loading...</p>}
        {data?.results?.map((game) => (
          <Card key={game.id} game={game} />
        ))}
      </div>
    </main>
  );
}
