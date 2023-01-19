import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginWaiterScreen from "../screens/Auth/LoginWaiter";
import LoginChefScreen from "../screens/Auth/LoginChef";
import OnBoarindScreen from "../screens/Auth/OnBoardingScreen";

const Stack = createNativeStackNavigator<AuthStackParamList>();
export default function AuthStack(){

    return(
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName = "On Boarding">
            <Stack.Screen name = "On Boarding" component={OnBoarindScreen} />
            <Stack.Screen name = "Login Chef" component={LoginChefScreen} />
            <Stack.Screen name = "Login Waiter" component={LoginWaiterScreen} />
        </Stack.Navigator>
    )
}