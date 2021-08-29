import { Redirect, Route } from "react-router-dom"
import useIsLogin from "../hooks/useIsLogin";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const IsLogin = useIsLogin();
    return(
        <Route
        {...rest}
        render = {(props) => (IsLogin ? <Component {...props} /> : <Redirect to="/"/>)}
        />
    );
}

export default PrivateRoute;