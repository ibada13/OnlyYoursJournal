import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";


export default function AppLayout() { 
    return (
<div className=" bg-bg min-h-screen flex flex-col">
            <NavBar />
            
  <main className="flex-1 mt-24">
    <Outlet />
  </main>
</div>

    )
}