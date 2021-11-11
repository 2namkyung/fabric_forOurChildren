import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from "axios";
import useIsLoginActions from "../hooks/useIsLoginActions";
import { useState, useEffect} from "react";
import useIsLogin from "../hooks/useIsLogin";

export default function LoginCheck() {

    const [cookies, removeCookie] = useCookies();
    const { LoginStatus } = useIsLoginActions();

    const IsLogin = useIsLogin();
    const [name, SetName] = useState(cookies.name);

    const url = "/info/" + name;
    console.log(IsLogin);

    useEffect(()=>{
        if(cookies.access_token !== "undefined" && cookies.access_token !== undefined){
            LoginStatus(true);
            SetName(cookies.name);
        }else {
            LoginStatus(false);
        }
    }, [IsLogin, LoginStatus]);

    return (
        <div className="loginStatus">
            {IsLogin &&
                <div className="login__ok">
                    <p><Link to={url} className="info__name">{name}</Link> 님 환영합니다</p>
                    <button className="logout" onClick={logout}>Logout</button>
                </div>
            }
            {!IsLogin &&
                 <Link to="/login" className="login">You need to Login!!</Link>
            }
        </div>
    )

    function logout() {
        axios.post("http://localhost:4000/logout", {
            // payload
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': cookies.access_token
            }
        })
            .then(response => {
                console.log("logout");
                LoginStatus(false);
                removeCookie('access_token');
                removeCookie('name');
            })
    }
}