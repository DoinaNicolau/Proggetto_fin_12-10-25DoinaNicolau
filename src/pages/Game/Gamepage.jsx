import { useParams, useNavigate } from "react-router-dom";
import useFetchSolution from "../../hooks/useFetchSolution";
import ToggleFavorite from "../../components/ToggleFavorite";
import Chatbox from "../../components/Chatbox";

export default function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;
  const initialUrl = `https://api.rawg.io/api/games/${id}?key=${apiKey}`;

  const { data: game, loading, error } = useFetchSolution(initialUrl);

  if (loading)
    return (
      <main className="p-4 sm:p-6 min-h-screen bg-[#F5E8C7] flex justify-center items-center">
        <p className="text-lg font-semibold text-gray-700">Caricamento...</p>
      </main>
    );

  if (error)
    return (
      <main className="p-4 sm:p-6 min-h-screen bg-[#F5E8C7] flex justify-center items-center">
        <p className="text-red-600 text-lg font-semibold">{`Errore: ${error}`}</p>
      </main>
    );

  if (!game) return null;

  return (
    <main className="p-4 sm:p-6 min-h-screen bg-[#F5E8C7] flex justify-center">
      <article className="w-full max-w-4xl bg-white/70 backdrop-blur-md rounded-xl shadow-lg p-6 sm:p-8 flex flex-col gap-6 mx-auto">
        {/* Header con titolo e bottone indietro */}
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-[#F5E8C7] text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-[#F5E8C7]/90 transition self-start"
          >
            ← Torna indietro
          </button>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 drop-shadow-md text-center sm:text-left">
            {game.name}
          </h1>
        </header>

        {/* Immagine principale */}
        {game.background_image && (
          <section>
            <img
              src={game.background_image}
              alt={game.name}
              className="rounded-xl shadow-xl w-full h-auto max-h-[500px] object-cover"
            />
          </section>
        )}

        {/* Toggle Favorite */}
        <section className="mt-4 self-center sm:self-start">
          <ToggleFavorite game={game} />
        </section>

        {/* Info principali */}
        <section className="flex flex-wrap gap-6 text-gray-800 font-medium justify-center sm:justify-start">
          <p>
            <strong>Rilasciato:</strong> {game.released || "N/A"}
          </p>
          <p>
            <strong>Rating:</strong> {game.rating || "N/A"}
          </p>
          {game.genres && (
            <p>
              <strong>Generi:</strong> {game.genres.map((g) => g.name).join(", ")}
            </p>
          )}
        </section>

        {/* Descrizione */}
        <section>
          <p className="text-gray-700 leading-relaxed text-center sm:text-left">
            {game.description_raw}
          </p>
        </section>

        {/* Chatbox */}
        <section className="mt-8 w-full">
          <Chatbox game={game} />
        </section>
      </article>
    </main>
  );
}
