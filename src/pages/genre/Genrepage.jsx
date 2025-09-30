import { useParams } from "react-router-dom";
import Card from "../../components/Card";
import useFetchSolution from "../../hooks/useFetchSolution";
import { useEffect } from "react";

export default function GenrePage() {
  const { genre } = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;

  // Inizializziamo il hook con un URL vuoto
  const { data, loading, error, updateUrl } = useFetchSolution("");

  // Aggiorniamo l'URL ogni volta che cambia il genere
  useEffect(() => {
    if (genre) {
      const url = `https://api.rawg.io/api/games?key=${apiKey}&genres=${genre}&page=1`;
      updateUrl(url);
    }
  }, [genre, apiKey, updateUrl]);

  if (loading)
    return (
      <p className="text-center mt-12 text-gray-700 text-lg">Loading...</p>
    );
  if (error)
    return (
      <p className="text-center mt-12 text-red-600 text-lg">{error}</p>
    );

  const games = data?.results || [];

  return (
    <main className="p-8 bg-[#F5E8C7] min-h-screen">
      <h1 className="text-2xl font-bold mb-6 capitalize">{genre}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center">
        {games.map((game) => (
          <Card key={game.id} game={game} />
        ))}
      </div>
    </main>
  );
}
