import { Outlet } from "react-router-dom";
import Middleware from "../../../components/auth/Middleware";
const AuthLayout = () => { 
    return (
        <Middleware middleware="auth">
            <Outlet/>
    </Middleware>
)


}


export default AuthLayout;