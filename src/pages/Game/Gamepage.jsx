import { useParams, useNavigate } from "react-router-dom";
import useFetchSolution from "../../hooks/useFetchSolution";

export default function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;
  const initialUrl = `https://api.rawg.io/api/games/${id}?key=${apiKey}`;

  const { data: game, loading, error } = useFetchSolution(initialUrl);

  if (loading)
    return (
      <div className="p-8 min-h-screen bg-[#F5E8C7] flex justify-center items-center">
        <p className="text-lg font-semibold text-gray-700">Caricamento...</p>
      </div>
    );
  if (error)
    return (
      <div className="p-8 min-h-screen bg-[#F5E8C7] flex justify-center items-center">
        <p className="text-red-600 text-lg font-semibold">{`Errore: ${error}`}</p>
      </div>
    );
  if (!game) return null;

  return (
    <div className="p-8 min-h-screen bg-[#F5E8C7] flex justify-center">
      <div className="w-full max-w-4xl bg-white/70 backdrop-blur-md rounded-xl shadow-lg p-6 flex flex-col gap-6">
        {/* Pulsante Torna indietro */}
        <button
          onClick={() => navigate(-1)}
          className="self-start px-4 py-2 bg-gradient-to-r from-yellow-400 to-[#F5E8C7] text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-[#F5E8C7]/90 transition"
        >
          ← Torna indietro
        </button>

        {/* Titolo e immagine */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 drop-shadow-md">
          {game.name}
        </h1>
        {game.background_image && (
          <img
            src={game.background_image}
            alt={game.name}
            className="rounded-xl shadow-xl w-full max-h-[500px] object-cover"
          />
        )}

        {/* Info principali */}
        <div className="flex flex-wrap gap-6 text-gray-800 font-medium">
          <p>
            <strong>Rilasciato:</strong> {game.released || "N/A"}
          </p>
          <p>
            <strong>Rating:</strong> {game.rating || "N/A"}
          </p>
          {game.genres && (
            <p>
              <strong>Generi:</strong>{" "}
              {game.genres.map((g) => g.name).join(", ")}
            </p>
          )}
        </div>

        {/* Descrizione */}
        <p className="text-gray-700 leading-relaxed">{game.description_raw}</p>
      </div>
    </div>
  );
}
