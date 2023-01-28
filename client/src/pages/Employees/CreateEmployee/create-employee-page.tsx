import { MenuItem, Select, TextField } from "@mui/material";
import { createEmployee } from "api/user";
import ElevatedContainer from "components/Container/Elevated";
import { Main } from "components/Container/Main";
import { TwoWayButton } from "components/Form/buttons";
import ImageUploader from "components/Form/image-uploader";
import Header from "components/Header/header";
import { toastError } from "components/Toast/toast";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "redux/employeeReducer";
import "./style.scss";
const defaultData: CreateEmployeeData = {
    contact_no: "" as any,
    email: "",
    full_name: "",
    gender: "unselected",
    password: "",
    profile_pic_url: "",
    role: "unselected"
}
export default function CreateEmployeePage(){
    const [data, setData] = useState<CreateEmployeeData>(defaultData);
    const [creating, setCreating] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onCreate = async(e: any) => {
        e.preventDefault();
        if(creating) return;
        if(!data.image) return toastError("Please upload a profile picture");
        setCreating(true);
        const res = await createEmployee(data);
        setCreating(false);
        if(res.error) return toastError(res.message);
        dispatch(addEmployee(res.data));
        navigate("/employees");
    }
    return(
        <>
            <Header title = "Create Employee" sub_title="Provide employee's details" />
            <Main className="center" id = "create-employee-page">
                <form onSubmit={onCreate}>
                    <ElevatedContainer className="employee-form">
                        <div style={{width: "100%", padding: "2rem 0"}} className = "center">
                            <ImageUploader onImage={image => setData({...data, image})} height="120px" width="120px" borderRadius="100%" />
                        </div>
                        <TextField onChange={e=>setData({...data, full_name: e.target.value})} variant="outlined" className="form-input" label = "Full Name" fullWidth size="small" />
                        <TextField onChange={e=>setData({...data, email: e.target.value})} variant="outlined" className="form-input" label = "Email" fullWidth size="small" type = "email" />
                        <TextField onChange={e=>setData({...data, contact_no: parseInt(e.target.value)})} variant="outlined" className="form-input" label = "Contact No" fullWidth size="small" type = "number" />
                        <Select onChange={e=>setData({...data, gender: e.target.value})} variant="outlined" size="small" defaultValue = "unselected" className="form-input" fullWidth>
                            <MenuItem value = "unselected">Gender</MenuItem>
                            <MenuItem value = "Male">Male</MenuItem>
                            <MenuItem value = "Female">Female</MenuItem>
                        </Select>
                        <TextField onChange={e=>setData({...data, password: e.target.value})} variant="outlined" className="form-input" label = "Password" fullWidth size="small" type = "password" />
                        <Select onChange={e=>setData({...data, role: e.target.value})} variant="outlined" size="small" defaultValue = "unselected" className="form-input" fullWidth>
                            <MenuItem value = "unselected">Role</MenuItem>
                            <MenuItem value = "Waiter">Waiter</MenuItem>
                            <MenuItem value = "Chef">Chef</MenuItem>
                        </Select>
                        <TwoWayButton onCancel={()=>navigate(-1)} isDisabled = {creating}>{creating?"Creating...":"Create"}</TwoWayButton>
                    </ElevatedContainer>
                </form>
            </Main>
        </>
    )
}