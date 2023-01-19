import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { StatusBar } from "expo-status-bar";
export default function AppNav(){
    return(
        <>
            <StatusBar style="auto" />
            <NavigationContainer>
                <AuthStack />
            </NavigationContainer>
        </>
        
    )
}