import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {

    const [IsLogin, setIsLogin] = useState(false);
    const [name, setName] = useState("Lee");
    
    function logout(){
        setIsLogin(true);
    }

    return (
        <div className="loginStatus">
            {IsLogin && <Link to="/login" className="login">You need to Login!!</Link>}
            {!IsLogin && <div className="login__ok"><p>{name} 님 환영합니다</p><button className="logout" onClick={logout}>Logout</button></div>}
        </div>
    );
}