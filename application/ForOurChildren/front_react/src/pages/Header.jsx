import React from 'react';
import { Link } from 'react-router-dom';
import LoginCheck from '../components/LoginCheck';
import Badges from '../components/Badges';

export default function Header(){

    return (
        <div className="header">
            <div className="inner">
                <div className="header_nav">
                    <div className="home">
                        <Link to="/" className="link_home">For Our Children</Link>
                    </div>
                    <div className="sub_menu">
                        <LoginCheck/>
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
                        </ul>
                    </div>
                </div>
            </div>
            <Badges />
        </div>
    );
}