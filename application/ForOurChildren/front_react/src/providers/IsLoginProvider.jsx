import IsLoginContext from "../contexts/IsLoginContext";
import { useState } from "react";


const IsLoginProvider = ({children}) =>{
    const [IsLogin, setIsLogin] = useState(false);

    const LoginStatus = (status) =>{
        if(status){
            setIsLogin(true);
        }else{
            setIsLogin(false);
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

