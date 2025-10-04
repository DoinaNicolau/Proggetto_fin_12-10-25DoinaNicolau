import { useState } from "react";
import Card from "../../components/Card";
import useFetchSolution from "../../hooks/useFetchSolution";

// Definizione piattaforme e mappa slug → ID RAWG
const platforms = [
  { name: "PC", slug: "pc", icon: "💻" },
  { name: "PlayStation", slug: "playstation", icon: "🎮" },
  { name: "Xbox", slug: "xbox", icon: "❎" },
  { name: "Nintendo Switch", slug: "switch", icon: "🕹️" },
];

const platformMap = {
  pc: 4,
  playstation: 187,
  xbox: 1,
  switch: 7,
};

export default function PlatformCategories() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  // Usa ID RAWG invece dello slug
  const platformUrl = selectedPlatform
    ? `https://api.rawg.io/api/games?key=${apiKey}&platforms=${platformMap[selectedPlatform]}&ordering=-added&page_size=8`
    : null;

  const { data: games, loading, error } = useFetchSolution(platformUrl);

  return (
    <section className="my-16">
      <h2 className="text-4xl font-heading text-accent mb-8 text-center">FILTRA PER PIATTAFORMA</h2>

      {/* Pulsanti piattaforme */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
        {platforms.map((platform) => (
          <button
            key={platform.slug}
            onClick={() =>
              setSelectedPlatform(platform.slug === selectedPlatform ? null : platform.slug)
            }
            className={`p-6 rounded-lg flex flex-col items-center justify-center text-center font-heading text-xl transition-all duration-300
              ${selectedPlatform === platform.slug ? "bg-accent text-white" : "bg-card-bg text-primary hover:bg-accent hover:text-white"}`}
          >
            <div className="text-4xl mb-2">{platform.icon}</div>
            {platform.name}
          </button>
        ))}
      </div>

      {/* Giochi filtrati */}
      {selectedPlatform && (
        <div>
          {loading && <p className="text-secondary text-center">Caricamento giochi...</p>}
          {error && <p className="text-accent text-center">Errore: {error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {games?.results?.map((game) => (
              <Card key={game.id} game={game} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
