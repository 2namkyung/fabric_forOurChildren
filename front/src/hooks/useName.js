import { useContext } from "react";
import IsLoginContext from "../contexts/IsLoginContext";

export default function useName(){
    const { LoginName } = useContext(IsLoginContext);

    return LoginName;
}