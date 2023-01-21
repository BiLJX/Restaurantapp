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
import { SocketContext } from "contexts/socketContext";
import { Socket } from "socket.io-client/build/esm/socket";
import io from "socket.io-client";
import { CONNECTION_URI } from "api/axios";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function AppNav(){
    const dispatch = useDispatch();
    const currentEmployee = useSelector((state: RootState)=>state.current_employee.data)
    const [loading, setLoading] = useState(false);
    const [socket, setSocket] = useState<Socket>()
    const fetchCurrentUser = async() => {
        setLoading(true);
        const res = await getCurrentEmployee();
        if(!res.error){
            dispatch(addCurrentEmployee(res.data));
        }
        setLoading(false);
    }
    const initializeSocket = async() => {
        const socket = io(CONNECTION_URI, {
            query: { token: await AsyncStorage.getItem("session") }
        });
        setSocket(socket);
    }
    useEffect(()=>{
        fetchCurrentUser();
    }, [])
    useEffect(()=>{
        initializeSocket();
        return(()=>{
            socket?.disconnect();
        })
    }, [currentEmployee])

    if(loading) return (
        <View>
            <Text>Loading...</Text>
        </View>
    )
    
    let Content: JSX.Element = <></>;
    if(!currentEmployee) Content = <AuthStack />
    else if(!socket) return (
        <View>
            <Text>Loading...</Text>
        </View>
    )
    else if(currentEmployee.role === "Chef") Content = (
        <SocketContext.Provider value = {socket}>
            <ChefStack />
        </SocketContext.Provider>
    )
    else if(currentEmployee.role === "Waiter")Content = (
        <SocketContext.Provider value = {socket}>
            <WaiterStack />
        </SocketContext.Provider>
    )
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