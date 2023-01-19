import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";

export default function AppNav(){
    return(
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
    )
}