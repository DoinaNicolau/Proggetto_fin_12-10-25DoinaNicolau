import { Link, useLocation } from "react-router-dom";
import useFetchSolution from "../hooks/useFetchSolution";
import HeaderCarousel from "./HeaderCarousel"; 

export default function Header() {
  const location = useLocation();

  // Bottone "Scopri di più" visibile solo in homepage e profilo
  const isAllowedPage = ["/", "/profile"].includes(location.pathname);

  // Altezza del carosello: full solo in homepage, banner altrove
  const isHomePage = location.pathname === "/";

  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://api.rawg.io/api/games?key=${apiKey}&dates=2023-01-01,${new Date()
    .toISOString()
    .split("T")[0]}&ordering=-metacritic&page_size=5`;

  const { data: gamesData, loading, error } = useFetchSolution(url);

  const gamesForCarousel =
    gamesData?.results.filter((game) => game.background_image) || [];

  const currentGame =
    gamesForCarousel.length > 0 ? gamesForCarousel[0] : null;

  return (
    <header
      className={`relative w-full flex items-center text-white overflow-hidden
        ${isHomePage ? "h-screen min-h-[700px]" : "h-[50vh] min-h-[400px]"}`}
    >
      {/* Sfondo con carosello */}
      <HeaderCarousel games={gamesForCarousel} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-xl">
          {loading && (
            <>
              <div className="h-16 bg-white/10 rounded w-3/4 mb-4 animate-pulse"></div>
              <div className="h-8 bg-white/10 rounded w-full mb-6 animate-pulse"></div>
              <div className="h-12 bg-white/10 rounded w-1/2 animate-pulse"></div>
            </>
          )}

          {error && (
            <p className="text-accent">Impossibile caricare i giochi in evidenza.</p>
          )}

          {currentGame && !loading && (
            <>
              <h1 className="text-5xl md:text-7xl font-heading uppercase">
                Esplora Nuovi Mondi
              </h1>
              <p className="mt-4 text-lg text-secondary leading-relaxed max-w-lg">
                In primo piano:{" "}
                <strong className="text-primary">{currentGame.name}</strong>.
                Scopri le ultime uscite, i titoli più acclamati e unisciti alla
                community.
              </p>

              {/* Bottone visibile solo in homepage e profilo */}
              {isAllowedPage && (
                <div className="mt-8">
                  <Link
                    to={`/games/${currentGame.slug}/${currentGame.id}`}
                    className="inline-block bg-accent text-primary font-heading px-8 py-3 rounded-md text-lg hover:bg-red-700 transition-colors transform hover:scale-105"
                  >
                    SCOPRI DI PIÙ
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
