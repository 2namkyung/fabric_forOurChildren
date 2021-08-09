import { throttle } from 'lodash';
import React from 'react';
import gsap from 'gsap';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

class Badges extends React.Component {

    constructor(props) {
        super(props);
        this.badge = React.createRef();
        this.upper = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('scroll', throttle(this.hiddenBadges, 300));
        this.upper.current.addEventListener('click', this.ToTop);
    }

    ToTop = () => {
        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    }

    hiddenBadges = () => {
        if (window.scrollY > 300) {
            //배지 숨기기
            //gsap.to(요소, 지속시간s, 옵션);
            gsap.to(this.badge.current, 0.6, {
                opacity: 0,
                display: 'none'
            });

            //탑 버튼 보이기
            gsap.to(this.upper.current, 0.2, {
                x: 0
            });

        } else {
            //배지 보이기
            gsap.to(this.badge.current, 0.6, {
                opacity: 1,
                display: 'block'
            });

            //탑 버튼 숨기기
            gsap.to(this.upper.current, 0.2, {
                x: 100
            });
        }
    }

    render() {
        return (
            <div>
                <div className="badges" ref={this.badge}>
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
                <div className="upper" ref={this.upper}>
                    <ArrowUpwardIcon />
                </div>

            </div>
        );
    }
}

export default Badges;