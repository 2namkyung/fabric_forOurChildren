import React from 'react';
import {Link} from 'react-router-dom';

class Footer extends React.Component {
    render() {
        return (

            <footer>
                <div className="inner">

                    <ul className="menu">
                        <li><Link to="/" className="green">개인정보처리방침</Link></li>
                        <li><Link to="/">후원금액 운영관리 방침</Link></li>
                        <li><Link to="/">홈페이지 이용약관</Link></li>
                        <li><Link to="/">위치정보 이용약관</Link></li>
                    </ul>

                    <div className="btn-group">
                        <Link to="/" className="btn btn--white">찾아오시는 길</Link>
                        <Link to="/" className="btn btn--white">후원문의</Link>
                        <Link to="/" className="btn btn--white">사이트 맵</Link>
                    </div>

                    <div className="info">
                        <span>사업자등록 777-7777-77777</span>
                        <span>(주) 청소년이 행복한 나라 이남경</span>
                        <span>TEL : 054) 231-3208 / PHONE : 010-4773-3208</span>
                        <span>개인정보 책임자 : 이남경</span>
                    </div>

                    <p className="copyright">
                        &copy; <span className="this-year">For Our Children, All Rights reserved.</span>
                    </p>
                </div>
            </footer>
        );
    }
}

export default Footer;