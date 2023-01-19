import LoginPage from "pages/Authentication/login";
import { Route, Router, Routes } from "react-router-dom";
import AdminRoutes from "./admin";

export default function App(){
    return(
        <Routes>
            <Route path = "/*" element =  {<AdminRoutes />} />
            <Route path = "/login" element = {<LoginPage />} />
        </Routes>
    )
}