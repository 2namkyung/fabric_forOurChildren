import { useContext } from "react";
import IsLoginContext from "../contexts/IsLoginContext";

export default function useIsLogin(){
    const {IsLogin} = useContext(IsLoginContext);

    return IsLogin;
}