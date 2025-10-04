import { useParams, useNavigate } from "react-router-dom";
import useFetchSolution from "../../hooks/useFetchSolution";
import ToggleFavorite from "../../components/ToggleFavorite";
import Chatbox from "../../components/Chatbox";
import Card from "../../components/Card"; 

// Componente per lo stato di caricamento (Skeleton Loader)
const GamePageSkeleton = () => (
  <div className="animate-pulse">
    {/* Banner placeholder */}
    <div className="h-[50vh] bg-gray-800"></div> 
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="lg:col-span-1">
          <div className="bg-gray-800/50 rounded-lg h-64"></div> 
          <div className="bg-gray-800/50 rounded-lg h-12 mt-4"></div>
        </aside>
        <div className="lg:col-span-2">
          <div className="bg-gray-800/50 rounded-lg h-48"></div>
          <div className="bg-gray-800/50 rounded-lg h-32 mt-8"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function GamePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;

  // Fetch per i dettagli del gioco principale
  const gameDetailUrl = `https://api.rawg.io/api/games/${id}?key=${apiKey}`;
  const { data: game, loading, error } = useFetchSolution(gameDetailUrl);

 
  const suggestedGamesUrl = `https://api.rawg.io/api/games/${id}/game-series?key=${apiKey}&page_size=4`;
  const { data: suggestedGames } = useFetchSolution(suggestedGamesUrl);

  if (loading) return <GamePageSkeleton />;
  // Assumiamo che 'text-accent' sia red-600 o simile per il tema scuro
  if (error) return <main className="text-center py-20 text-red-600">Errore: {error}</main>;
  if (!game) return null;

  const minimalCardClass = "p-4 rounded-lg border border-gray-700/50"; 

  return (
    <main>
      {/* --- Banner Image --- */}
      <header className="relative h-[50vh] w-full">
        <img
          src={game.background_image}
          alt={`Banner di ${game.name}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
      </header>

      {/* --- Contenuto Principale (Layout a 2 colonne) --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-10">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          
          {/* --- Colonna Sinistra (Info Principali - Sticky) --- */}
          <aside className="lg:col-span-1 lg:sticky lg:top-24 self-start">
            <h1 className="text-5xl font-heading text-white mb-4">{game.name}</h1>
            
            <section className={minimalCardClass.replace('p-4', 'p-6')}> 
              <h2 className="sr-only">Dettagli del gioco</h2> 
              <ul className="space-y-3 font-body text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-400">Rilascio:</span>
                  <span className="text-white">{game.released || "N/A"}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Metascore:</span>
                  <span className="font-bold text-red-600">{game.metacritic || "N/A"}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Generi:</span>
                  <span className="text-white text-right">{game.genres.map(g => g.name).join(", ")}</span>
                </li>
                 <li className="flex justify-between">
                  <span className="text-gray-400">Sviluppatore:</span>
                  <span className="text-white text-right">{game.developers[0]?.name || "N/A"}</span>
                </li>
              </ul>
              <div className="mt-6 flex justify-center">
                <ToggleFavorite game={game} />
              </div>
            </section>
          </aside>

          {/* --- Colonna Destra (Descrizione e Chat) --- */}
          <div className="lg:col-span-2 mt-8 lg:mt-0">
            
            <article className={minimalCardClass}> 
              <h2 className="text-3xl font-heading text-red-600 mb-4">DESCRIZIONE</h2>
              <p className="font-body text-gray-400 leading-relaxed whitespace-pre-line">
                {game.description_raw}
              </p>
            </article>
            <Chatbox game={game} />
          </div>

        </div>
      </section>

      {/* --- Sezione Giochi Simili ---*/}

      {suggestedGames?.results?.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h2 className="text-4xl font-heading text-red-600 mb-8">POTREBBE INTERESSARTI ANCHE</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {suggestedGames.results.map(suggestedGame => (
              <Card key={suggestedGame.id} game={suggestedGame} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}