import { useContext } from "react";
import StoreListContext from "../contexts/StoreListContext";

export default function useOrders(){
    const {orders} = useContext(StoreListContext);

    return orders;
}