
import { useParams, useNavigate } from "react-router-dom";
import useFetchSolution from "../../hooks/useFetchSolution";

export default function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;
  const initialUrl = `https://api.rawg.io/api/games/${id}?key=${apiKey}`;

  const { data: game, loading, error } = useFetchSolution(initialUrl);

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>Errore: {error}</p>;
  if (!game) return null;

   return (
    <div className="p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        ← Torna indietro
      </button>

      <h1 className="text-3xl font-bold mb-4">{game.name}</h1>
      <img
        src={game.background_image}
        alt={game.name}
        className="rounded-lg shadow-lg mb-6"
      />
      <p><strong>Rilasciato:</strong> {game.released}</p>
      <p><strong>Rating:</strong> {game.rating}</p>
      <p className="mt-4">{game.description_raw}</p>
    </div>
  );
}
