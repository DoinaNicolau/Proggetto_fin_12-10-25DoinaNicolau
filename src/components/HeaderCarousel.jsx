
import { useState, useEffect } from "react";

export default function HeaderCarousel({ games = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
  
    if (games.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [games.length]);

  if (games.length === 0) {

    return (
      <>
        <div className="absolute inset-0 bg-dark-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </>
    );
  }

  return (
    <>
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${games[currentIndex].background_image})` }}
        key={currentIndex}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
    </>
  );
}