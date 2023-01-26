import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SeatScreen from "../screens/Waiter/seat-screen";
import WaiterHome from "../screens/Waiter/home";
import { ICON_COLORS } from "../constants/colors";
import MenuScreen from "screens/Waiter/menu";
import FoodScreen from "screens/Waiter/FoodScreen";
import TakeOrderlistScreen from "screens/Waiter/TakeOrderlistScreen";
import OrderListScreen, { OrderBySeatScreen } from "screens/Waiter/OrderListScreen";
import BillScreen from "screens/Waiter/BillScreen";

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
            <Stack.Screen name = "Orders" component={OrderListScreen} options = {{headerShadowVisible: false}} />
            <Stack.Screen name = "Orders By Seat" component={OrderBySeatScreen} />
            <Stack.Screen name = "Bill" component={BillScreen} />
        </Stack.Navigator>
    )
}