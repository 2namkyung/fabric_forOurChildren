import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from "axios";
import useIsLogin from "../hooks/useIsLogin";
import useIsLoginActions from "../hooks/useIsLoginActions";
import useName from "../hooks/useName";

export default function LoginCheck(){

    const [cookies, removeCookie] = useCookies();
    const { LoginStatus } = useIsLoginActions();
    const loginName = useName();
    const IsLogin = useIsLogin();

    console.log(cookies.access_token);

    const url = "/info/" +loginName;

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
                    <p><Link to={url} className="info__name">{loginName}</Link> 님 환영합니다</p>
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
            console.log(response);
            removeCookie('access_token');
        })
        LoginStatus();
    }
}