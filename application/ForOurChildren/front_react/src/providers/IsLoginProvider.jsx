import IsLoginContext from "../contexts/IsLoginContext";
import { useState } from "react";
import { useCookies } from "react-cookie";


const IsLoginProvider = ({children}) =>{
    const [IsLogin, SetIsLogin] = useState(false);
    const [LoginName, SetLoginName] = useState("");

    const [cookies] = useCookies();

    const LoginStatus = (status) =>{
        if(status){
            SetIsLogin(true);
        }else{
            SetIsLogin(false);
        }
    }

    const SetName = (name) =>{
        SetLoginName(name);
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

