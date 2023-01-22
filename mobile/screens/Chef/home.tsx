import { OrderItem } from "@shared/Order"
import { getOrders } from "api/order-api"
import OrderList from "components/OrderList/OrderList"
import { toastError } from "components/Toast/toast"
import { SocketContext } from "contexts/socketContext"
import { useEffect, useContext } from "react"
import { View, Text, ScrollView } from "react-native"
import { useDispatch } from "react-redux"
import { addOrderItems, addOrderList } from "redux/orderReducer"

export function ChefHome(){
    const dispatch = useDispatch();
    const socket = useContext(SocketContext);
    useEffect(()=>{
        getOrders().then(res=>{
            if(res.error) return toastError("Error while fetching orders.");
            dispatch(addOrderList(res.data));
        })
        const onNewOrder = (items: OrderItem[]) => {
            dispatch(addOrderItems(items));
        }
        socket.on("order:new", onNewOrder)
        return(()=>{
            socket.off("order:new", onNewOrder) 
        })
    }, [])
    return(
        <ScrollView className="p-4 bg-white-200">
            <OrderList status="Pending" />
            <OrderList status="Cooking" />
            <OrderList status="Ready" />
            <OrderList status="Delivered" />
        </ScrollView>
    )
}