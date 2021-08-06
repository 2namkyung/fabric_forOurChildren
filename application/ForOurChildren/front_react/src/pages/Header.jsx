import React from 'react';
import { Link } from 'react-router-dom';


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
                                    <Link to="/transactionLogAll" className="link_tx">Transaction</Link>
                                </li>
                                <li>
                                    <Link to="/login" className="link_login">Login</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Header;