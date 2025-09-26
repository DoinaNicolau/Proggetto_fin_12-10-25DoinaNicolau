import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function HeaderCarousel({ images }) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop
      className="h-64 w-full"
    >
      {images.map((img, idx) => (
        <SwiperSlide key={idx}>
          <img
            src={img}
            alt={`slide-${idx}`}
            className="w-full h-64 object-cover rounded-lg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
