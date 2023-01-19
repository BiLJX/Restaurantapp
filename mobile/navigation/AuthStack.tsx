import { createNativeStackNavigator } from "@react-navigation/native-stack"
import OnBoarindScreen from "../screens/Auth/OnBoardingScreen";

const Stack = createNativeStackNavigator();
export default function AuthStack(){

    return(
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName = "On Boarding">
            <Stack.Screen name = "On Boarding" component={OnBoarindScreen} />
        </Stack.Navigator>
    )
}