import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Toast from "react-native-toast-message";
export default function AppNav(){
    return(
        <>
            <StatusBar style="auto" />
            <NavigationContainer>
            <View className="z-[999]" >
                <Toast /> 
            </View>
                <AuthStack />
            </NavigationContainer>
        </>
        
    )
}