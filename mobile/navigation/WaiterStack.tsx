import { createNativeStackNavigator } from "@react-navigation/native-stack"
import WaiterHome from "../screens/Waiter/home";

const Stack = createNativeStackNavigator();
export default function WaiterStack(){

    return(
        <Stack.Navigator>
            <Stack.Screen name = "Home" component={WaiterHome} />
        </Stack.Navigator>
    )
}