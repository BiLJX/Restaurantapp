import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ICON_COLORS } from "constants/colors";
import ChefHome from "screens/Chef/home";
import { ChefOrderScreen } from "../screens/Chef/OrderScreen";
import WaiterHome from "../screens/Waiter/home";

const Stack = createNativeStackNavigator<ChefStackParamList>();
export default function ChefStack(){
    return(
        <Stack.Navigator screenOptions={{
            headerTintColor: ICON_COLORS.header_color,
            headerBackTitleVisible: false
        }}>
            <Stack.Screen name = "Home" component={ChefHome} />
            <Stack.Screen name = "Orders" component={ChefOrderScreen} options ={{
                headerShadowVisible: false
            }} />
        </Stack.Navigator>
    )
}