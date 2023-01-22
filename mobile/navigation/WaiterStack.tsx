import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SeatScreen from "../screens/Waiter/seat-screen";
import WaiterHome from "../screens/Waiter/home";
import { ICON_COLORS } from "../constants/colors";
import MenuScreen from "screens/Waiter/menu";
import FoodScreen from "screens/Waiter/FoodScreen";
import TakeOrderlistScreen from "screens/Waiter/TakeOrderlistScreen";
import OrderListScreen from "screens/Waiter/OrderListScreen";

const Stack = createNativeStackNavigator<WaiterStackParamList>();
export default function WaiterStack(){
    
    return(
        <Stack.Navigator screenOptions={{
            headerTintColor: ICON_COLORS.header_color,
            headerBackTitleVisible: false
        }}>
            <Stack.Screen name = "Home" component={WaiterHome} />
            <Stack.Screen name = "Tables" component={SeatScreen}/>
            <Stack.Screen name = "Menu" component={MenuScreen} options = {{headerShadowVisible: false}} />
            <Stack.Screen name = "Food" component={FoodScreen} />
            <Stack.Screen name = "List" component={TakeOrderlistScreen} />
            <Stack.Screen name = "Orders" component={OrderListScreen} />
        </Stack.Navigator>
    )
}