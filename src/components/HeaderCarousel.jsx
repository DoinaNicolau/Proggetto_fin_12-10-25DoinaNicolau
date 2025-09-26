import { useState, useEffect } from "react";

export default function HeaderCarousel({ images }) {
  const [current, setCurrent] = useState(0);

  // Auto-scroll ogni 3 secondi
  useEffect(() => {
    if (!images || images.length === 0) return;
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-300 rounded-xl">
        Caricamento carousel...
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-4xl h-64 overflow-hidden rounded-xl shadow-md">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`slide-${idx}`}
          className={`absolute top-0 left-0 w-full h-64 object-cover rounded-xl transition-opacity duration-1000 ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
