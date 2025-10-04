import { Link } from "react-router-dom";
import Card from "../../components/Card";
import useFetchSolution from "../../hooks/useFetchSolution";


// Componente per le categorie di piattaforme
const PlatformCategories = () => {
  const platforms = [
    { name: "PC", slug: "pc", icon: "💻" },
    { name: "PlayStation", slug: "playstation", icon: "🎮" },
    { name: "Xbox", slug: "xbox", icon: "❎" },
    { name: "Nintendo", slug: "nintendo", icon: " SWITCH" }, 
  ];

  return (
    <section className="my-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {platforms.map((platform) => (
          <Link
            key={platform.slug}
            to={`/platforms/${platform.slug}`} 
            className="bg-card-bg p-6 rounded-lg flex flex-col items-center justify-center text-center group hover:bg-accent transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="text-4xl mb-2">{platform.icon}</div>
            <h3 className="font-heading text-2xl text-primary">{platform.name.toUpperCase()}</h3>
            <p className="font-body text-sm text-accent group-hover:text-primary transition-colors">
              VIEW GAMES
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default function HomePage() {
  const apiKey = import.meta.env.VITE_API_KEY;
  
  // URL per i giochi più popolari
  const popularGamesUrl = `https://api.rawg.io/api/games?key=${apiKey}&ordering=-added&page_size=8`;
  // URL per le prossime uscite
  const upcomingGamesUrl = `https://api.rawg.io/api/games?key=${apiKey}&dates=${new Date().toISOString().split('T')[0]},2025-12-31&ordering=-added&page_size=4`;

  const { data: popularGames, loading: loadingPopular, error: errorPopular } = useFetchSolution(popularGamesUrl);
  const { data: upcomingGames, loading: loadingUpcoming, error: errorUpcoming } = useFetchSolution(upcomingGamesUrl);

  return (
    <main>

      {/* Sezione Categorie Piattaforme */}
      <PlatformCategories />

      {/* Sezione Giochi Popolari */}
      <section className="mb-16">
        <h2 className="text-4xl font-heading text-accent mb-8">I PIÙ GIOCATI DEL MOMENTO</h2>
        
        {loadingPopular && <p className="text-secondary">Caricamento giochi popolari...</p>}
        {errorPopular && <p className="text-accent">Errore nel caricare i giochi: {errorPopular}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {popularGames?.results?.map((game) => (
            <Card key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Sezione Prossime Uscite */}
      <section className="mb-16">
        <h2 className="text-4xl font-heading text-accent mb-8">PROSSIME USCITE</h2>
        
        {loadingUpcoming && <p className="text-secondary">Caricamento prossime uscite...</p>}
        {errorUpcoming && <p className="text-accent">Errore nel caricare le prossime uscite: {errorUpcoming}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingGames?.results?.map((game) => (
            <Card key={game.id} game={game} />
          ))}
        </div>
      </section>

    </main>
  );
}
