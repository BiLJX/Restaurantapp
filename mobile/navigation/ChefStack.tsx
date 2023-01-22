import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ChefHome } from "../screens/Chef/home";
import WaiterHome from "../screens/Waiter/home";

const Stack = createNativeStackNavigator();
export default function ChefStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name = "Home" component={ChefHome} options ={{
                headerShadowVisible: false
            }} />
        </Stack.Navigator>
    )
}