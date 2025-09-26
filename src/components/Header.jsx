import { useState, useEffect } from "react";
import HeaderCarousel from "./HeaderCarousel";

export default function Header() {
  const [images, setImages] = useState([]);

  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://api.rawg.io/api/games?key=${apiKey}&dates=2024-01-01,2024-12-31&page=1`;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        const imgs = data.results
          .filter(game => game.background_image)
          .slice(0, 5)
          .map(game => game.background_image);
        setImages(imgs);
      } catch (err) {
        console.error(err);
      }
    };
    fetchImages();
  }, []);

  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg p-6 flex flex-col items-center rounded-b-xl">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide drop-shadow-lg mb-4">
        Progetto Finale
      </h1>

      {/* Carosello separato */}
      <HeaderCarousel images={images} />
    </header>
  );
}
