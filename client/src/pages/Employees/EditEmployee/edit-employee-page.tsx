import { MenuItem, Select, TextField } from "@mui/material";
import { createEmployee, editEmployee, getEmployeeById } from "api/user";
import ElevatedContainer from "components/Container/Elevated";
import { Main } from "components/Container/Main";
import { TwoWayButton } from "components/Form/buttons";
import ImageUploader from "components/Form/image-uploader";
import Header from "components/Header/header";
import { toastError } from "components/Toast/toast";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateEmployee } from "redux/employeeReducer";
import "./style.scss";
export default function EditEmployeePage(){
    const [data, setData] = useState<CreateEmployeeData>();
    const [editing, setEditing] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = useParams().id || "";
    const fetchData = async() => {
        const res = await getEmployeeById(id);
        if(res.error) return toastError(res.message);
        setData(res.data);
    }
    useEffect(()=>{
        fetchData();
    }, [id])
    if(!data) return (
        <>
            <Header title = "Create Employee" sub_title="Provide employee's details" />
        </>
    )
    const onCreate = async(e: any) => {
        e.preventDefault();
        if(editing) return;
        setEditing(true);
        const res = await editEmployee(data);
        setEditing(false);
        if(res.error) return toastError(res.message);
        dispatch(updateEmployee(res.data));
        navigate("/employees");
    }
    
    
    return(
        <>
            <Header title = "Create Employee" sub_title="Provide employee's details" />
            <Main className="center" id = "create-employee-page">
                <form onSubmit={onCreate}>
                    <ElevatedContainer className="employee-form">
                        <div style={{width: "100%", padding: "2rem 0"}} className = "center">
                            <ImageUploader value = {data.profile_pic_url} onImage={image => setData({...data, image})} height="120px" width="120px" borderRadius="100%" />
                        </div>
                        <TextField value={data.full_name} onChange={e=>setData({...data, full_name: e.target.value})} variant="outlined" className="form-input" label = "Full Name" fullWidth size="small" />
                        <TextField value={data.email} onChange={e=>setData({...data, email: e.target.value})} variant="outlined" className="form-input" label = "Email" fullWidth size="small" type = "email" />
                        <TextField value={data.contact_no} onChange={e=>setData({...data, contact_no: parseInt(e.target.value)})} variant="outlined" className="form-input" label = "Contact No" fullWidth size="small" type = "number" />
                        <Select value={data.gender} onChange={e=>setData({...data, gender: e.target.value})} variant="outlined" size="small" defaultValue = "unselected" className="form-input" fullWidth>
                            <MenuItem value = "unselected">Gender</MenuItem>
                            <MenuItem value = "Male">Male</MenuItem>
                            <MenuItem value = "Female">Female</MenuItem>
                        </Select>
                        <Select value={data.role} onChange={e=>setData({...data, role: e.target.value})} variant="outlined" size="small" defaultValue = "unselected" className="form-input" fullWidth>
                            <MenuItem value = "unselected">Role</MenuItem>
                            <MenuItem value = "Waiter">Waiter</MenuItem>
                            <MenuItem value = "Chef">Chef</MenuItem>
                        </Select>
                        <TwoWayButton onCancel={()=>navigate(-1)} isDisabled = {editing}>{editing?"editing...":"Edit"}</TwoWayButton>
                    </ElevatedContainer>
                </form>
            </Main>
        </>
    )
}