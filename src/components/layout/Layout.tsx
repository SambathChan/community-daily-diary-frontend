import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Toaster } from "@/components/ui/toaster";


function Layout() {
  return (
    <div className="bg-slate-100 min-h-dvh">
      <Header />
      <div className="flex flex-col justify-center">
        <Outlet />
      </div>
      <Toaster />
    </div>
  );
}

export default Layout;