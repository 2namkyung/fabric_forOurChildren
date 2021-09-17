import { throttle } from 'lodash';
import React from 'react';
import gsap from 'gsap';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

export default function Badges(){

    const badge = useRef(null);
    const upper = useRef(null);

    useEffect(()=>{
        window.addEventListener('scroll', throttledScrollBadges);
        upper.current.addEventListener('click', ToTop);
    }, [badge, upper]);

    const throttledScrollBadges = useMemo(
        () =>
        throttle(()=>{
        if (window.scrollY > 300) {
            //배지 숨기기
            //gsap.to(요소, 지속시간s, 옵션);
            gsap.to(badge.current, {duration: 0.6,
                opacity: 0,
                display: 'none'
            });

            //탑 버튼 보이기
            gsap.to(upper.current, {duration: 0.2,
                x: 0
            });

        } else {
            //배지 보이기
            gsap.to(badge.current, {duration:0.6,
                opacity: 1,
                display: 'block'
            });

            //탑 버튼 숨기기
            gsap.to(upper.current, {duration:0.2,
                x: 100
            });
        }
        }, 300),
        []
    )

    function ToTop(){
        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    }

    return (
        <div>
            <div className="badges" ref={badge}>
                <div className="badge">
                    <Link to="/transfer">송금하기</Link>
                </div>
                <div className="badge">
                    <img src="/img/gopher.png" alt="Badge"></img>
                </div>
                <div className="badge">
                    <img src="/img/gopher.png" alt="Badge"></img>
                </div>
                <div className="badge">
                    <img src="/img/gopher.png" alt="Badge"></img>
                </div>
            </div>
            <div className="upper" ref={upper}>
                <ArrowUpwardIcon />
            </div>
        </div>
    );
}
