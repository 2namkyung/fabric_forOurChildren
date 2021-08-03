import React from 'react';
import { Link } from 'react-router-dom';


class Header extends React.Component {

    render() {
        return (
            <div className="title">
                <div className="home">
                    <Link to="/" className="link_home">For Our Children</Link>
                </div>
                <div className="tx">
                    <Link to="/getTransaction/all" className="link_tx">Transaction</Link>
                    <Link to="/login" className="link_login">Login</Link>
                </div>
            </div>
        );
    }
}

export default Header;