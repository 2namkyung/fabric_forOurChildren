import { useContext } from "react";
import IsLoginContext from "../contexts/IsLoginContext";

export default function useIsLoginActions(){
    const { LoginStatus } = useContext(IsLoginContext);

    return {LoginStatus};
}