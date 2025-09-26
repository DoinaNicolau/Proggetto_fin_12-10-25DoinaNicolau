import { useState, useEffect } from "react";
import Card from "../components/Card";

export default function HomePage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null); 

  const apiKey = "4ea90cabca104555800919a286129ade"; // puoi anche usare import.meta.env.VITE_API_KEY
  const initialUrl = `https://api.rawg.io/api/games?key=${apiKey}&dates=2024-01-01,2024-12-31&page=1`;

  const load = async () => {
    try {
      const response = await fetch(initialUrl);
      if (!response.ok) throw new Error(response.statusText);
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(error.message);
      setData(null);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {error && <p className="text-red-600 col-span-full">Error: {error}</p>}
      {!data && !error && <p  className="col-span-full">Loading...</p>}
      {data && data.results.map((game) => <Card key={game.id} game={game} />)}
    </main>
  );
}
