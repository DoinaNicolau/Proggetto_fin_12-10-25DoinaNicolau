import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Card from "../../components/Card";
import useFetchSolution from "../../hooks/useFetchSolution";

export default function HomePage() {

  const apiKey = import.meta.env.VITE_API_KEY;
  const initialUrl = `https://api.rawg.io/api/games?key=${apiKey}&dates=2024-01-01,2024-12-31&page=1`;

  const { selectedGenre } = useOutletContext();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // ricarica ogni volta che cambia il genere
  useEffect(() => {
   if (selectedGenre) {
    const url = `https://api.rawg.io/api/games?key=${apiKey}&genres=${selectedGenre}&page=1`;
    updateUrl(url); // se usi updateUrl dal custom hook
    load(); // ricarica i dati
  }
}, [selectedGenre]);

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
        {data?.results.map((game) => (
          <Card key={game.id} game={game} />
        ))}
      </div>
    </main>
  );
}
