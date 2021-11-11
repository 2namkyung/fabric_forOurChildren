import { useContext } from "react";
import StoreListContext from "../contexts/StoreListContext";

export default function useActions(){
    const {addToOrder, remove, removeAll} = useContext(StoreListContext);

    return {addToOrder, remove, removeAll};
}