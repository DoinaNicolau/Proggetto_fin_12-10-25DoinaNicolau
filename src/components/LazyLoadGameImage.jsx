import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function LazyLoadGameImage({ image, alt = "game image" }) {
  return (
    <div className="relative group rounded-xl overflow-hidden bg-card-bg shadow-lg">
      <LazyLoadImage
        alt={alt}
        effect="blur"
        className="h-56 w-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
        wrapperProps={{
          style: { transitionDelay: "0.5s" },
        }}
        src={image}
      />

  
      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-dark-bg/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
