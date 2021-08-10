import React from 'react';
import { Link } from 'react-router-dom';
import Purchase from '../components/Purchase';
import Badges from './Badges';

class Header extends React.Component {

    render() {
        return (
            <div className="header">
                <div className="inner">
                    <div className="header_nav">
                        <div className="home">
                            <Link to="/" className="link_home">For Our Children</Link>
                        </div>
                        <div className="sub_menu">
                            <ul>
                                <li>
                                    <Link to="/" className="link_tx">Home</Link>
                                </li>
                                <li>
                                    <Link to="/user" className="link_tx">Children</Link>
                                </li>
                                <li>
                                    <Link to="/transactionLogAll" className="link_tx">Transaction</Link>
                                </li>
                                <li>
                                    <Link to="/login" className="link_login">Login</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Purchase/>
                <Badges/>
            </div>
        );
    }
}

export default Header;