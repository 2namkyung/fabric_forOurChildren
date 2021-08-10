import { useCallback } from "react";
import { useState } from "react";
import StoreListContext from "../contexts/StoreListContext";


const StoreListStateProvider = ({ children }) => {

    const [storeLists] = useState([
        {
            id: "p-01",
            title: "ABC Store",
            ceo: "Lee",
            desc: "가게 소개 글을 적어주세요.",
            price: 10,
        },
        {
            id: "p-02",
            title: "CDG Store",
            ceo: "Park",
            desc: "가게 소개 글을 적어주세요.",
            price: 110,
        },
        {
            id: "p-03",
            title: "ETDG Store",
            ceo: "Kim",
            desc: "가게 소개 글을 적어주세요.",
            price: 40,
        },
        {
            id: "p-04",
            title: "ABCE Store",
            ceo: "Joo",
            desc: "가게 소개 글을 적어주세요.",
            price: 30,
        },
        {
            id: "p-05",
            title: "WAC Store",
            ceo: "Choi",
            desc: "가게 소개 글을 적어주세요.",
            price: 120,
        },
        {
            id: "p-06",
            title: "PEA Store",
            ceo: "Hwang",
            desc: "가게 소개 글을 적어주세요.",
            price: 50,
        },

    ]);

    const [orders, setOrders] = useState([]);

    const addToOrder = useCallback((id)=>{
        setOrders((orders) =>{
            const finded = orders.find(order=>order.id===id);
            if(finded === undefined){
                return [...orders, {id, quantity:1}];
            }else{
                return orders.map(order => {
                    if(order.id===id){
                        return{
                            id,
                            quantity:order.quantity+1
                        }
                    }else{
                        return order;
                    }
                })
            }
        })
    }, []);

    const remove = useCallback((id)=>{
        setOrders((orders)=>{
            return orders.filter((order)=>order.id !== id);
        });
    }, []);

    const removeAll = useCallback(()=>{
        setOrders([]);
    }, []);

    return (
        <StoreListContext.Provider value={{
            storeLists,
            orders,
            addToOrder,
            remove,
            removeAll
        }}>
            {children}
        </StoreListContext.Provider>

    );
}

export default StoreListStateProvider;