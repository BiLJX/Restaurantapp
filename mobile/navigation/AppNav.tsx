import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react"
import WaiterStack from "./WaiterStack";
import { getCurrentEmployee } from "../api/auth-api";
import { addCurrentEmployee } from "../redux/employeeReducer";
import ChefStack from "./ChefStack";
export default function AppNav(){
    const dispatch = useDispatch();
    const currentEmployee = useSelector((state: RootState)=>state.current_employee.data)
    const [loading, setLoading] = useState(false);
    const fetchCurrentUser = async() => {
        setLoading(true);
        const res = await getCurrentEmployee();
        if(!res.error){
            dispatch(addCurrentEmployee(res.data));
        }
        setLoading(false);
    }
    useEffect(()=>{
        fetchCurrentUser();
    }, [])

    if(loading) return (
        <View>
            <Text>Loading...</Text>
        </View>
    )
    let Content: JSX.Element = <></>;
    if(!currentEmployee) Content = <AuthStack />
    else if(currentEmployee.role === "Chef") Content = <ChefStack />
    else if(currentEmployee.role === "Waiter")Content = <WaiterStack />
    return(
        <>
            <StatusBar style="auto" />
            <NavigationContainer>
                <ToastComponent />
                {Content}
            </NavigationContainer>
        </>
    )
}

function ToastComponent(){
    return(
        <View className="z-[999]" >
            <Toast /> 
        </View>
    )
}