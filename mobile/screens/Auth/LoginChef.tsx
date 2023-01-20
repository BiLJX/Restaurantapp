import { Button } from "../../components/Buttons/buttons";
import { Text } from "react-native";
import { SafeAreaView } from "react-native";
import { View, Image } from "react-native";
import AuthInput from "../../components/InputField/InputField";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { ICON_COLORS } from "../../constants/colors";
import { useState } from "react";
import { login } from "../../api/auth-api";
import { toastError, toastSuccess } from "../../components/Toast/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { addCurrentEmployee } from "../../redux/employee/employeeReducer";

export default function LoginChefScreen(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const onLogin = async() => {
        const res = await login({email, password, role: "Chef"});
        if(res.error) return toastError(res.message);
        res.data.token && await AsyncStorage.setItem("session", res.data.token);
        dispatch(addCurrentEmployee(res.data.employee));
        toastSuccess(res.message);
    }
    return(
        <SafeAreaView className="flex-1 bg-white-100">
            <KeyboardAvoidingView className="p-6 flex-1" behavior="padding">
                <ScrollView showsVerticalScrollIndicator = {false} className="flex-1" >
                    <Image className="w-full h-[300px]" source={require("assets/chef.jpg")} />
                    <Text className="mt-8 text-center text-3xl font-bold text-primary-200">Welcome Chef !</Text>
                    <Text className="text-center mt-4 text-gray-blue text-base mb-4">Login to your account</Text>
                    <AuthInput placeholder="Email ID" onChange={setEmail} icon={<MaterialIcons name="alternate-email" size={24} color={ICON_COLORS.input} />} />
                    <AuthInput secureTextEntry placeholder="Password" onChange={setPassword} icon={<MaterialIcons name="lock-outline" size={24} color={ICON_COLORS.input} />}/>
                    <Text className="text-right font-semibold text-[#1668ff]">Forgot Password?</Text>
                    <View className="mt-8">
                        <Button onPress={onLogin}>Login</Button>  
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
       </SafeAreaView>
    )
}