import { useParams, useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import useFetchSolution from "../../hooks/useFetchSolution";

// Mappa slug → ID RAWG
const platformMap = {
  pc: 4,
  playstation: 187,
  xbox: 1,
  switch: 7,
};

export default function PlatformPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;

  // Usa ID RAWG invece dello slug
  const platformId = platformMap[slug];
  const url = platformId
    ? `https://api.rawg.io/api/games?key=${apiKey}&platforms=${platformId}&ordering=-added&page_size=8`
    : null;

  const { data: games, loading, error } = useFetchSolution(url);

  return (
    <main className="my-16">
      <h2 className="text-4xl font-heading text-accent mb-8 text-center">
        Giochi per: {slug.toUpperCase()}
      </h2>

      {/* Pulsante Torna Indietro */}
      <div className="text-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
        >
          ← Torna indietro
        </button>
      </div>

      {loading && <p className="text-secondary text-center">Caricamento giochi...</p>}
      {error && <p className="text-accent text-center">Errore: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {games?.results?.map((game) => (
          <Card key={game.id} game={game} />
        ))}
      </div>
    </main>
  );
}
