import ElevatedContainer from "components/Container/Elevated";
import { TextField } from "@mui/material";
import "./login.scss"
import { Button } from "components/Form/buttons";
import { useEffect, useState } from "react";
import { adminLogin } from "api/auth";
import { toastError } from "components/Toast/toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "redux/adminReducer";
import { Employee } from "@shared/User";
export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onLogin = async(e: any) => {
        e.preventDefault();
        const res = await adminLogin(email, password);
        if(res.error){
            setPassword("");
            toastError(res.message);
            return;
        }
        dispatch(signIn(res.data as Employee));
        navigate("/");
    }
    return(
        <div className = "login-page center">
            <ElevatedContainer style={{padding: "1.5rem"}}>
                <form className="login-form" onSubmit={onLogin}>
                    <header className="center">
                        <h1 className="text-primary font-bold text-3xl">Admin Panel</h1>
                    </header>
                    <TextField
                    className="input"
                    variant="outlined"
                    label = "Email"
                    type="email"
                    size="small"
                    value={email}
                    onChange = {(e)=>setEmail(e.target.value)}
                    />
                    <TextField
                    className="input"
                    variant="outlined"
                    label = "Password"
                    type="password" 
                    size="small"
                    value={password}
                    onChange = {(e)=>setPassword(e.target.value)}
                    />
                    <Button>Login</Button>
                </form>
            </ElevatedContainer>
        </div>
    )
}