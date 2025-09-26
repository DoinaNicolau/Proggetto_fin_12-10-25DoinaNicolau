import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function LazyLoadGameImage({image}){
    return (
        <LazyLoadImage
        alt="game image"
        effect="blur"
        className="h-48 w-full object-cover"
        wrapperProps={
            {
                style:{transitionDelay:"0.5s"},
                className: "rounded-lg overflow-hidden"
            }
        }
        src={image}/>
    );
}