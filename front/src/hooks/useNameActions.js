import { useContext } from "react";
import IsLoginContext from "../contexts/IsLoginContext";

export default function useNameActions(){
    const { SetName } = useContext(IsLoginContext);

    return {SetName};
}