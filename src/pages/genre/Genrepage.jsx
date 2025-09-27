import { useParams } from "react-router-dom";
import Card from "../../components/Card";
import useFetchSolution from "../../hooks/useFetchSolution";

export default function GenrePage() {
  const { genre } = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;
  const initialUrl = `https://api.rawg.io/api/games?key=${apiKey}&genres=${genre}&page=1`;

  const { data, loading, error } = useFetchSolution(initialUrl);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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