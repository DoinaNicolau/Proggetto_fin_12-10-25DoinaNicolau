import LazyLoadGameImage from "./LazyLoadGameImage";

export default function Card({game}){


    return(
    <div className="card bg-base-100 shadow-xl w-80 hover:scale-105 transition-transform duration-300">
        <figure className="relative group">
            <LazyLoadGameImage  image={game.background_image} alt={game.name} />
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          ⭐ {game.rating} | {game.released || "N/A"}
        </div>
        </figure>
        <div className="card-body">
            <h2 className="card-title text-lg">{game.name}</h2>
            <p className="text-sm text-gray-500">
            Released: {game.released || "N/A"}
            </p>
            <p className="text-sm">⭐ {game.rating} / 5</p>
            <div className="card-actions justify-end">
            <button className="btn btn-primary btn-sm">Details</button>
            </div>
        </div>
    </div>   
    );
}


