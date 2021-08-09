import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Autoplay} from 'swiper';

import AddCircleIcon from '@material-ui/icons/AddCircle';

SwiperCore.use([Autoplay]);

export default function Promotion() {

    return (
        <div className="inner">
            <div className="promotion">
                <div className="notice">
                    <div className="notice_left">
                        <h2>공지사항</h2>
                        <Swiper
                        direction={'vertical'}
                        centeredSlides={true}
                        autoplay={{"delay":5000}}
                        centeredSlides={true}
                        loop={true}
                        slidesPerView={1}>
                            <SwiperSlide>2021년 8월 이달의 가게 발표</SwiperSlide>
                            <SwiperSlide>2021년 상반기 우수후원자 표창</SwiperSlide>
                            <SwiperSlide>항상 감사합니다</SwiperSlide>
                            <SwiperSlide>8월 이벤트 당첨자 발표</SwiperSlide>
                        </Swiper>
                    </div>
                    <div className="notice_right">
                        <h2>후원하러가기</h2>
                        <AddCircleIcon className="plus"/>
                    </div>
                </div>
                <div className="awards">awards</div>
            </div>
        </div>

    );
}