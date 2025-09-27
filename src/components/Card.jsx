import { Link } from "react-router-dom";
import LazyLoadGameImage from "./LazyLoadGameImage";

export default function Card({ game }) {
  return (
    <div className="bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl shadow-md hover:shadow-xl transition transform hover:scale-105 overflow-hidden">
      
      <figure className="relative">
        <LazyLoadGameImage
          image={game.background_image}
          alt={game.name}
          className="h-48 w-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-lg">
          ⭐ {game.rating} | {game.released || "N/A"}
        </div>
      </figure>
      
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-1">{game.name}</h2>
        <p className="text-sm text-gray-700 mb-2">Released: {game.released || "N/A"}</p>
        <p className="text-sm mb-3">⭐ {game.rating} / 5</p>

        <div className="flex justify-end">
          <Link
            to={`/games/${game.slug}/${game.id}`}
            className="bg-yellow-300 hover:bg-yellow-400 text-black text-sm px-3 py-1 rounded shadow"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
