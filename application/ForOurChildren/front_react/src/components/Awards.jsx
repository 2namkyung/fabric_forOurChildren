import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";

SwiperCore.use([Autoplay, Pagination, Navigation]);

export default function Awards() {
    return (
        <div className="awards">
            <Swiper
                loop={true}
                spaceBetween={10}
                centeredSlides={true}
                slidesPerView={3}>
                <SwiperSlide><img src="/img/gopher.png" alt="Badge"></img></SwiperSlide>
                <SwiperSlide><img src="/img/gopher.png" alt="Badge"></img></SwiperSlide>
                <SwiperSlide><img src="/img/gopher.png" alt="Badge"></img></SwiperSlide>
                <SwiperSlide><img src="/img/gopher.png" alt="Badge"></img></SwiperSlide>
            </Swiper>
        </div>
    );
}