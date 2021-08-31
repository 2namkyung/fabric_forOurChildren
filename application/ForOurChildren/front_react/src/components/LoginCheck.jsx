import { useState } from "react";
import { Link } from "react-router-dom";
import useIsLogin from "../hooks/useIsLogin";
import useIsLoginActions from "../hooks/useIsLoginActions";
import useName from "../hooks/useName";

export default function LoginCheck(){

    const IsLogin = useIsLogin();
    const { LoginStatus } = useIsLoginActions();
    const loginName = useName();

    const url = "/info/" +loginName;

    return (
        <div className="loginStatus">
            {!IsLogin && <Link to="/login" className="login">You need to Login!!</Link>}
            {IsLogin && 
            <div className="login__ok">
                <p><Link to={url} className="info__name">{loginName}</Link> 님 환영합니다</p>
                <button className="logout" onClick={logout}>Logout</button>
            </div>}
        </div>
    );

    function logout(){
        LoginStatus(false);
    }

}