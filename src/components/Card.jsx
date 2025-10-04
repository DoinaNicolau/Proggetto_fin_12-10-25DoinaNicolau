import { Link } from "react-router-dom";
import LazyLoadGameImage from "./LazyLoadGameImage";
import RatingInput from "./RatingInput"; 

export default function Card({ game }) {

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
       
        <svg key={`full-${i}`} className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.784.57-1.838-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.064 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      );
    }
   
    return stars;
  };

  return (
    
    <div className="bg-gray-800 rounded-lg overflow-hidden group transition-transform duration-500 ease-in-out hover:-translate-y-2 flex flex-col justify-between border border-gray-700/50 hover:border-red-600">
      
      {/* Sezione Immagine */}
      <Link to={`/games/${game.slug}/${game.id}`} className="block">
        <figure className="relative">
          <LazyLoadGameImage
            image={game.background_image}
            alt={game.name}
            className="h-48 w-full object-cover group-hover:opacity-80 transition-opacity duration-500"
          />
          {/* Mostra il genere principale in un "tag" */}
          {game.genres && game.genres[0] && (
            <div className="absolute top-3 left-3 bg-red-600 text-white font-heading text-xs px-2 py-1 rounded">
              {game.genres[0].name.toUpperCase()}
            </div>
          )}
        </figure>
      </Link>
      
      {/* Sezione Contenuto */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-heading text-white truncate mb-2 group-hover:text-red-500 transition-colors duration-500">
          {game.name}
        </h2>
        
        {/* Rating RAWG visualizzato */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex">{renderStars(game.rating)}</div>
          <span className="text-sm text-gray-400">{game.rating.toFixed(1)}</span>
        </div>

        {/* 2. COMPONENTE DI VOTAZIONE QUI */}
        <div className="mb-4">
            <h3 className="text-xs text-gray-500 mb-1">Vota tu:</h3>
            <RatingInput gameId={game.id} /> 
        </div>

        {/* Informazioni aggiuntive (piattaforme) */}
        <div className="flex items-center gap-2 mt-auto">
          {game.parent_platforms?.slice(0, 3).map(({ platform }) => (
            <span key={platform.id} className="text-gray-500" title={platform.name}>
              {platform.slug === 'pc' && '💻'}
              {platform.slug === 'playstation' && '🎮'}
              {platform.slug === 'xbox' && '❎'}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}