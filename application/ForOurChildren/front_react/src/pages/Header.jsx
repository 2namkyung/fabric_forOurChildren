import React from 'react';
import { Link } from 'react-router-dom';
import Badges from './Badges';

const loginStatus = false;
const name = "Lee";

class Header extends React.Component {

    render() {
        return (
            <div className="header">
                <div className="inner">
                    <div className="loginStatus">
                        {loginStatus &&<p>로그인이 필요합니다</p>}
                        {!loginStatus &&<p>{name} 님 환영합니다</p>}
                    </div>
                    <div className="header_nav">
                        <div className="home">
                            <Link to="/" className="link_home">For Our Children</Link>
                        </div>
                        <div className="sub_menu">
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/user">Children</Link>
                                </li>
                                <li>
                                    <Link to="/explorer">Explorer</Link>
                                </li>
                                <li>
                                    <Link to="/transactionLogAll">Transaction</Link>
                                </li>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Badges />
            </div>
        );
    }
}

export default Header;