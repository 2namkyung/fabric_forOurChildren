import { throttle } from "lodash";
import React, { useEffect } from "react";
import gsap from 'gsap';
import useOrders from "../hooks/useOrders";
import useStoreLists from "../hooks/useStoreLists";
import { useMemo } from "react";
import useActions from "../hooks/useActions";

import ClearIcon from '@material-ui/icons/Clear';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export default function Purchase() {

    const orders = useOrders();
    const storeLists = useStoreLists();
    const { remove, removeAll } = useActions();

    const purchaseBadge = React.createRef();

    const totalPrice = useMemo(() => {
        return orders.map(order => {
            const { id, quantity } = order;
            const storeList = storeLists.find(p => p.id === id);
            return storeList.price * quantity;
        }).reduce((l, r) => l + r, 0);
    }, [orders, storeLists]);

    useEffect(() => {
        window.addEventListener('scroll', throttle(hiddenPurchanse))
    });

    function hiddenPurchanse() {
        if (window.scrollY > 400) {
            gsap.to(purchaseBadge.current, 0.6, {
                opacity: 0,
                display: 'none'
            })
        } else {
            gsap.to(purchaseBadge.current, 0.6, {
                opacity: 1,
                display: 'block'
            })
        }
    }

    if (orders.length === 0) {
        return (
            <div className="purchaseList" ref={purchaseBadge}>
                <h2 className="item__title">Item List</h2>
                <div className="body">
                    <div className="empty">
                        <div className="title">You don't have any orders</div>
                        <div className="subtitle">Click on a + too add an order</div>
                    </div>
                </div>

            </div>
        )
    }

    return (
        <div className="purchaseList" ref={purchaseBadge}>
            <h2 className="item__title">Item List</h2>
            <div className="body">
                {orders.map(order => {
                    const { id } = order;
                    const storeList = storeLists.find(p => p.id === id);
                    const click = () => {
                        remove(id);
                    }
                    return (
                        <div className="item" key={id}>
                            <div className="content">
                                <p>{storeList.title} X {order.quantity}</p>
                            </div>
                            <div className="action">
                                <p>$ {storeList.price * order.quantity}</p>
                                <ClearIcon className="delete" onClick={click}/>
                            </div>
                        </div>
                    )
                })}
            </div>
            <hr color="black"/>
            <div className="total">
                <h2>Total</h2>
                <div className="price">$ {totalPrice}</div>
                <DeleteForeverIcon className="deleteAll" onClick={removeAll}/>
            </div>
            <button style={{width:"100%", marginTop:10}} className="btn btn--secondary">Checkout</button>
        </div>
    )
}