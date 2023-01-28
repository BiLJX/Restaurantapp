import { Employee } from "@shared/User";
import { deleteEmployee } from "api/user";
import Avatar from "components/Avatar/avatar";
import { Button } from "components/Form/buttons";
import { toastError, toastSuccess } from "components/Toast/toast";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeEmployee } from "redux/employeeReducer";

import "./data-table.scss"
export default function DataTable({data}: {data: Employee[]}){
    return(
        <table className="data-table">
            <thead>
                <tr>
                    <th style={{width: "70px"}}></th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Contact</th>
                    <th>Hire Date</th>
                    <th>Id</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((x, i)=><Tr data={x} key = {i} />)
                }
            </tbody>
        </table>
    )
}

function Tr({data}: {data: Employee}){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onDelete = async() => {
        if(!window.confirm("Are you sure you want to delete the employee?")) return;
        const res = await deleteEmployee(data.user_id);
        if(res.error) return toastError(res.message);
        toastSuccess("Deleted employee");
        dispatch(removeEmployee(data.user_id));
    }
    return(
        <tr>
            <td><Avatar src={data.profile_pic_url} size={45} style = {{borderRadius: "10px"}} /></td>
            <td><span className="full-name">{data.full_name}</span></td>
            <td>{data.role}</td>
            <td>
                <div>{data.contact_no}</div>
                <div className="email">{data.email}</div>
            </td>
            <td>
                {moment(data.createdAt).format("L")}
            </td>
            <td>
                {data.user_id}
            </td>
            <td>
                <Button onClick={()=>navigate(`/employees/${data.user_id}/edit`)} className="action-buttons" vairant="secondary-2">Edit</Button>
                <Button onClick={onDelete} className="action-buttons" style = {{marginLeft: "5px"}}>Delete</Button>
            </td>
        </tr>
    )
}