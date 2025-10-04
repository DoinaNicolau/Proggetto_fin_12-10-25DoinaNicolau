import { useParams } from "react-router-dom";
import Card from "../../components/Card";
import useFetchSolution from "../../hooks/useFetchSolution";
import { useEffect } from "react";
import GenresDropdown from "../../components/GenresDropdown"; 


export default function GenrePage() {
  const { genre } = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;

  // hook con un URL vuoto
  const { data, loading, error, updateUrl } = useFetchSolution("");


  useEffect(() => {
    if (genre) {
      const url = `https://api.rawg.io/api/games?key=${apiKey}&genres=${genre}&page=1`;
      updateUrl(url);
    }
  }, [genre, apiKey, updateUrl]);

  if (loading)
    return (
      <p className="text-center mt-12 text-gray-400 text-lg">Loading...</p> 
    );
  if (error)
    return (
      <p className="text-center mt-12 text-red-600 text-lg">{error}</p>
    );

  const games = data?.results || [];


  const formatGenreName = (slug) => {

      if (!slug) return '';
      return slug
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
  }

  return (
    <main className="p-8 min-h-screen"> 
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
       
        <h1 className="text-3xl font-heading font-bold capitalize text-white">
          {formatGenreName(genre)}
        </h1>

       
        <div className="w-full md:w-64">
           <GenresDropdown />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center">
        {games.map((game) => (
          <Card key={game.id} game={game} />
        ))}
      </div>
    </main>
  );
}