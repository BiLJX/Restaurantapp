import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SeatScreen from "../screens/Waiter/seat-screen";
import WaiterHome from "../screens/Waiter/home";
import { ICON_COLORS } from "../constants/colors";
import MenuScreen from "screens/Waiter/menu";
import FoodScreen from "screens/Waiter/FoodScreen";
import TakeOrderlistScreen from "screens/Waiter/TakeOrderlistScreen";
import OrderListScreen, { OrderBySeatScreen } from "screens/Waiter/OrderListScreen";
import BillScreen from "screens/Waiter/BillScreen";
import { OrderStatus } from "@shared/Order";
import { useDispatch } from "react-redux";
import { changeOrderStatus, removeOrderItem } from "redux/orderReducer";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "contexts/socketContext";
import { Audio } from "expo-av";
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator<WaiterStackParamList>();
export default function WaiterStack(){
    const [sound, setSound] = useState<Audio.Sound>()
    const socket = useContext(SocketContext);
    const dispatch = useDispatch();
    const onStatusChange = async(data:{order_item_id: string, status: OrderStatus}) => {
        dispatch(changeOrderStatus(data));
        if(data.status === "Ready"){
            Toast.show({
                type: "success",
                text1: "Food Ready",
                text2: `Check Orders`
            })
            const { sound } = await Audio.Sound.createAsync( require('../assets/ServiceBell.mp3'));      
            setSound(sound);
            await sound.playAsync()
        }
    }
    const onOrderItemDelete = (data: {order_item_id: string}) => {
        dispatch(removeOrderItem(data.order_item_id));
    }
    useEffect(()=>{
        socket.on("order-item:status", onStatusChange);
        socket.on("order-item:cancel", onOrderItemDelete);
        return(()=>{
            socket.off("order-item:status", onStatusChange);
            socket.off("order-item:cancel", onOrderItemDelete);
            sound?.unloadAsync();
        })
    }, [])
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