import { throttle } from "lodash";
import React, { useEffect } from "react";
import gsap from 'gsap';
import useOrders from "../hooks/useOrders";
import useStoreLists from "../hooks/useStoreLists";
import { useMemo } from "react";
import useActions from "../hooks/useActions";

import ClearIcon from '@material-ui/icons/Clear';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useRef, useState } from "react";
import {useCookies} from 'react-cookie';
import axios from 'axios';

export default function Purchase() {

    const orders = useOrders();
    const storeLists = useStoreLists();
    const purchaseLists = [];
    const { remove, removeAll } = useActions();
    const [cookies] = useCookies();

    const purchaseBadge = useRef(null);

    useEffect(() => {
        window.addEventListener('scroll', hiddenPurchase);

        return () => window.removeEventListener('scroll', hiddenPurchase);
    }, []);

    const totalPrice = useMemo(() => {
        return orders.map(order => {
            const { id, quantity } = order;
            const storeList = storeLists.find(p => p.id === id);
            return storeList.price * quantity;
        }).reduce((l, r) => l + r, 0);
    }, [orders, storeLists]);


    const hiddenPurchase = useMemo(
        () =>
            throttle(() => {
                if (window.scrollY > 350) {
                    gsap.to(purchaseBadge.current,{duration: 0.6,
                        opacity: 0,
                        display: 'none'
                    })
                } else {
                    gsap.to(purchaseBadge.current,{duration: 0.6, 
                        opacity: 1,
                        display: 'block'
                    })
                }
            }, 300), []
    );

    const checkout = () =>{
        const name = cookies.name;
        // console.log(name);

        let body = {
            name,
            purchaseLists
        }

        axios.post("http://localhost:4000/purchase", JSON.stringify(body), {
            headers: {'Content-Type':'application/json',
            'Authorization': `${cookies.access_token}`},
            credential:true
        })
        .then(response=>{
            if(response.status===200){
                alert("결제가 성공되었습니다!!");
            }else{
                alert("결제가 불가합니다!!");
            }
        })
        .catch((response)=>{
            alert("로그인이 필요합니다");
        });

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
                    storeList.quantity = order.quantity;
                    purchaseLists.push(storeList);
                    console.log(purchaseLists);
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
                                <ClearIcon className="delete" onClick={click} />
                            </div>
                        </div>
                    )
                })}
            </div>
            <hr color="black" />
            <div className="total">
                <h2>Total</h2>
                <div className="price">$ {totalPrice}</div>
                <DeleteForeverIcon className="deleteAll" onClick={removeAll} />
            </div>
            <button style={{ width: "100%", marginTop: 10 }} className="btn btn--secondary" onClick={checkout}>Checkout</button>
        </div>
    )
}