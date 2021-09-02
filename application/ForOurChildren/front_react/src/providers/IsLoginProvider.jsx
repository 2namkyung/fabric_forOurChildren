import IsLoginContext from "../contexts/IsLoginContext";
import { useState } from "react";
import { useCookies } from "react-cookie";


const IsLoginProvider = ({children}) =>{
    const [IsLogin, setIsLogin] = useState(false);
    const [LoginName, setLoginName] = useState("");

    const [cookies] = useCookies();

    const LoginStatus = (status) =>{
        if(status){
            setIsLogin(true);
        }else{
            setIsLogin(false);
        }
    }

    const SetName = (name) =>{
        setLoginName(name);
    }

    return(
        <IsLoginContext.Provider value={
            {
                IsLogin,
                LoginName,
                SetName,
                LoginStatus,
            }
        }>
            {children}
        </IsLoginContext.Provider>
        
    );
}


export default IsLoginProvider

