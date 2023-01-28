import { getDashboard } from "api/dashboard";
import { Main } from "components/Container/Main";
import Header from "components/Header/header";
import { toastError } from "components/Toast/toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDashboard } from "redux/dashboardReducer";
import { RootState } from "redux/store";
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import DashboardPreviewCard from "./components/dashboard-preview-card";
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import "./styles.scss"
import RevenueComponent from "./components/revenue";
import OrdersComponent from "./components/order";
import PieComponent from "./components/pie-component";
export default function DashbaordPage(){
    const dashboardData = useSelector((state: RootState) => state.dashboard.data);
    const dispatch = useDispatch();
    useEffect(()=>{
        getDashboard()
        .then(res=>{
            if(res.error) return toastError("Error while fetching dashboard");
            dispatch(addDashboard(res.data));
        })
    }, [])
    if(!dashboardData){
        return(
            <>
                <Header title="Dashboard" sub_title="Welcome to your dashboard" />
                <Main>
                    
                </Main>
            </>   
        )
    }
    return(
        <>
            <Header title="Dashboard" sub_title="Welcome to your dashboard" />
            <Main id = "dashboard" className="flex-col">
                <div className="flex flex-row">
                    <div className="preview-card-container">
                        <DashboardPreviewCard caption="Employees working on your restaurant" icon={<Groups2OutlinedIcon />} data = {dashboardData.dash_board_overview.total_employees_count} />
                        <DashboardPreviewCard caption="Orders today in your restaurant" icon={<InsertChartOutlinedIcon />} data = {dashboardData.dash_board_overview.total_orders_count} />
                        <DashboardPreviewCard caption="Of revenue generated today" icon={<AccountBalanceOutlinedIcon />} data = {"Rs " + dashboardData.dash_board_overview.total_revenue_count} />
                        <DashboardPreviewCard caption="Of revenue generated this month" icon={<AccountBalanceOutlinedIcon />} data = {"Rs " + dashboardData.dash_board_overview.total_revenue_month_count} />
                    </div>
                    <RevenueComponent />
                </div>
                <div className = "flex h-[330px]">
                    <OrdersComponent />
                    <PieComponent />
                </div>
                
            </Main>
        </>
    )
}