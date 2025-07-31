import { Outlet } from "react-router-dom";
import Middleware from "../../../components/auth/Middleware";
const GuestLayout = () => { 
    return (
        <Middleware middleware="guest">
            <Outlet />
        </Middleware>
    )
}


export default GuestLayout;