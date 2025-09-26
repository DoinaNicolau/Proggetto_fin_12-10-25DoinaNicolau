import { useState, useEffect } from "react";
import Card from "../components/Card";

export default function HomePage({ selectedGenre }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_API_KEY;
  const initialUrl = `https://api.rawg.io/api/games?key=${apiKey}&dates=2024-01-01,2024-12-31&page=1`;

  const load = async () => {
    try {
      const response = await fetch(initialUrl);
      if (!response.ok) throw new Error(response.statusText);
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(error.message);
      setData(null);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filteredGames = selectedGenre
    ? data?.results.filter((game) =>
        game.genres.some((g) => g.slug === selectedGenre)
      )
    : data?.results;

  return (
    <main className="p-8 bg-[#F5E8C7] min-h-screen">
      {error && (
        <p className="text-red-600 text-center bg-white/60 backdrop-blur-md p-4 rounded-lg shadow mb-6">
          Error: {error}
        </p>
      )}
      {!data && !error && (
        <p className="text-center bg-white/60 backdrop-blur-md p-4 rounded-lg shadow mb-6">
          Loading...
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center">
        {filteredGames?.map((game) => (
          <Card key={game.id} game={game} />
        ))}
      </div>
    </main>
  );
}
