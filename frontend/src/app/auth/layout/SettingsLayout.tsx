import { Outlet } from "react-router-dom";
import Middleware from "../../../components/auth/Middleware";
import SideNavBar from "../components/SideNabBar";
const SettingsLayout = () => { 
    return (
        <Middleware middleware="auth">
            <div className="w-[90%] mx-auto max-w-3xl gap-y-4 items-center  sm:gap-y-0 p-3 h-auto flex flex-col sm:flex-row flex-around gap-x-12 mt-12">
            <SideNavBar/>
            <Outlet/>
            </div>
    </Middleware>
)


}


export default SettingsLayout;