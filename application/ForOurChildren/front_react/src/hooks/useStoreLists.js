import { useContext } from "react";
import StoreListContext from "../contexts/StoreListContext";

export default function useStoreLists(){
    const {storeLists} = useContext(StoreListContext);

    return storeLists;
}