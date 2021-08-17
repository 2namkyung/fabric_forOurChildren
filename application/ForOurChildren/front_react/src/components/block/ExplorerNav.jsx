import React from "react";
import { NavLink } from "react-router-dom";

// ExplorerNav don't need to re-render
const ExplorerNav = React.memo(() => {
    return (
        <div className="inner">
            <div className="Ex__Nav">
                <div className="nav__list">
                    <NavLink to="/explorer/network">Channel</NavLink>
                </div>
                <div className="nav__list">
                    <NavLink to="/explorer/blocks">Block</NavLink>
                </div>
                <div className="nav__list">
                    <NavLink to="/explorer/txs">Transaction</NavLink>
                </div>
                <div className="nav__list">
                    <NavLink to="/explorer/chaincode">Chaincode</NavLink>
                </div>
            </div>
        </div>
    )
})

export default ExplorerNav;