import { getCurrentAdmin } from "api/auth";
import NavBar from "components/Navigation/nav-bar";
import DashbaordPage from "pages/Dashboard/dashboard";
import CreateEmployeePage from "pages/Employees/CreateEmployee/create-employee-page";
import EditEmployeePage from "pages/Employees/EditEmployee/edit-employee-page";
import EmployeesPage from "pages/Employees/employees-page";
import CreateMenuPage from "pages/Menu/create/create-menu-page";
import EditFoodPage from "pages/Menu/food/edit-food";
import { MenuPage } from "pages/Menu/menu-page";
import SeatsPage from "pages/Seat/seats-page";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { RootState } from "redux/store";

export default function AdminRoutes(){
    const navigate = useNavigate();
    const admin = useSelector((root: RootState)=>root.current_admin);
    const [loading, setLoading] = useState(false);
    const checkLogin = async () => {
        setLoading(true);
        const res = await getCurrentAdmin();
        setLoading(false);
        if(res.error) {
            navigate("/login")
        }
    }
    useEffect(()=>{
        if(!admin){
            checkLogin()
        }
    }, [])
    if(loading) return (
        <div>
            LOADING...
        </div>
    )
    return(
        <> 
            <NavBar />
            <Routes>
                <Route index element = {<DashbaordPage />} />
                <Route path = "menu/create" element = {<CreateMenuPage />} />
                <Route path = "menu/food/:id" element = {<EditFoodPage />} />
                <Route path = "menu" element = {<MenuPage />} />
                <Route path = "menu/:id" element = {<MenuPage />} />

                //Employee Routes

                <Route path = "employees/create" element = {<CreateEmployeePage />} />
                <Route path = "employees" element = {<EmployeesPage />} />
                <Route path = "employees/:id/edit" element = {<EditEmployeePage />} />

                //Seat Routes
                <Route path = "seats" element = {<SeatsPage />} /> 
            </Routes>
        </>
    )
}