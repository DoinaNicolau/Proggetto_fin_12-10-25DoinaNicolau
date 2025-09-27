import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useFetchSolution from "../../hooks/useFetchSolution";
import Card from "../../components/Card";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const apiKey = import.meta.env.VITE_API_KEY;
  const initialUrl = `https://api.rawg.io/api/games?key=${apiKey}&search=${query}`;

  const { data, loading, error, updateUrl } = useFetchSolution(initialUrl);

  useEffect(() => {
    if (query) {
      updateUrl(`https://api.rawg.io/api/games?key=${apiKey}&search=${query}`);
    }
  }, [query]);

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>Errore: {error}</p>;
  if (!data || data.results.length === 0) return <p>Nessun risultato trovato</p>;

  return (
    <main className="p-8 bg-[#F5E8C7] min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Risultati per: "{query}"</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {data.results.map((game) => (
          <Card key={game.id} game={game} />
        ))}
      </div>
    </main>
  );
}
