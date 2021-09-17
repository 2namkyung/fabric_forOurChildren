import { Redirect, Route } from "react-router-dom"
import useIsLogin from "../hooks/useIsLogin";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const IsLogin = useIsLogin();

    function Redirecting(){
        alert("로그인이 필요합니다");

        return <Redirect to="/"/>
    }

    return(
        <Route
        {...rest}
        render = {(props) => (IsLogin ? <Component {...props} /> : Redirecting())}
        />
    );
}

export default PrivateRoute;