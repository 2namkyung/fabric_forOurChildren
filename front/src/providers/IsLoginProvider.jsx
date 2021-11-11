import IsLoginContext from "../contexts/IsLoginContext";
import { useState } from "react";


const IsLoginProvider = ({children}) =>{
    const [IsLogin, SetIsLogin] = useState(false);

    const LoginStatus = (status) =>{
        if(status){
            SetIsLogin(true);
        }else{
            SetIsLogin(false);
        }
    }

    return(
        <IsLoginContext.Provider value={
            {
                IsLogin,
                LoginStatus,
            }
        }>
            {children}
        </IsLoginContext.Provider>
        
    );
}


export default IsLoginProvider

