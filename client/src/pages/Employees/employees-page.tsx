import ElevatedContainer from "components/Container/Elevated";
import { Main } from "components/Container/Main";
import Header from "components/Header/header";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Button } from "components/Form/buttons";
import "./style.scss";
import { RootState } from "types";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "./Table/data-table";
import { useEffect, useState } from "react";
import { getEmployees } from "api/user";
import { toastError } from "components/Toast/toast";
import { addEmployeeArray } from "redux/Employee/employeeActions";
import { useNavigate } from "react-router-dom";

export default function EmployeesPage(){
    const employees = useSelector((state: RootState)=>state.employees);
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        getEmployees(search)
        .then(res=>{
            if(res.error) return toastError(res.message);
            dispatch(addEmployeeArray(res.data));
        })
    }, [search])
    return(
        <>
            <Header title="Employees" sub_title="Manage, edit, delete your employees" />
            <Main id = "employees-page" className="center">
                <ElevatedContainer className="contents-container">
                    <div className = "title">RESTAURANT EMPLOYEE</div>
                    <div style={{display: "flex", width: "100%", marginBottom: "1rem"}}>
                        <SearchBar onSearch = {setSearch} />
                        <Button onClick={()=>navigate("/employees/create")} vairant="secondary" style={{marginLeft: ".0rem", padding: "0.6em", fontSize: ".9rem"}}>Add Employee</Button>
                    </div>
                    <div>
                        <DataTable data={employees} />
                    </div>
                </ElevatedContainer>
                
            </Main>
        </>
    )
}

function SearchBar({onSearch}: {onSearch: (name: string)=>void}){
    return(
        <div className = "search-container">
            <div className = "search-icon center">
                <SearchRoundedIcon />
            </div>
            <input placeholder="Search" className = "search-input" onChange={e=>onSearch(e.target.value)} />
        </div>
    )
}