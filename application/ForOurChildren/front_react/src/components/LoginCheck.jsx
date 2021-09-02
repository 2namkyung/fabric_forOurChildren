import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from "axios";
import useIsLoginActions from "../hooks/useIsLoginActions";
import useName from "../hooks/useName";
import useIsLogin from "../hooks/useIsLogin";

export default function LoginCheck(){

    const [cookies, removeCookie] = useCookies();
    const { LoginStatus } = useIsLoginActions();
    const IsLogin = useIsLogin();
    const name = useName();

    console.log(IsLogin, name);

    const url = "/info/" + name;
    
    if(!IsLogin){
        return (
        <div className="loginStatus">
             <Link to="/login" className="login">You need to Login!!</Link>
        </div>
        );
    }else{
        return(
            <div className="loginStatus">
                <div className="login__ok">
                    <p><Link to={url} className="info__name">{name}</Link> 님 환영합니다</p>
                    <button className="logout" onClick={logout}>Logout</button>
                </div>
            </div>
        );
    }

    function logout(){
        axios.post("http://localhost:4000/logout",{
            header: {'Content-Type':'application/json'}
        })
        .then(response => {
            console.log("logout");
            LoginStatus(false);
            removeCookie('access_token');
        })
        LoginStatus(false);
    }
}