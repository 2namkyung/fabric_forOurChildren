import { useState } from "react";
import { Link } from "react-router-dom";
import useIsLogin from "../hooks/useIsLogin";
import useIsLoginActions from "../hooks/useIsLoginActions";

export default function LoginCheck(){

    const IsLogin = useIsLogin();
    const { LoginStatus } = useIsLoginActions();
    const [name] = useState("Lee");

    const url = "/info/" +name;

    return (
        <div className="loginStatus">
            {!IsLogin && <Link to="/login" className="login">You need to Login!!</Link>}
            {IsLogin && 
            <div className="login__ok">
                <p><Link to={url} className="info__name">{name}</Link> 님 환영합니다</p>
                <button className="logout" onClick={logout}>Logout</button>
            </div>}
        </div>
    );

    function logout(){
        LoginStatus(false);
    }

}