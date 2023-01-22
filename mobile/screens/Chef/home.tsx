import { OrderItem } from "@shared/Order"
import { getOrders } from "api/order-api"
import OrderList from "components/OrderList/OrderList"
import { toastError } from "components/Toast/toast"
import { SocketContext } from "contexts/socketContext"
import { useEffect, useContext, useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet, FlatList } from "react-native"
import { useDispatch } from "react-redux"
import { addOrderItems, addOrderList } from "redux/orderReducer"

interface NavItem {
    name: string,
    is_active: boolean
}

const navItems: NavItem[] = [
    {name: "All", is_active: true},
    {name: "Pending", is_active: false},
    {name: "Cooking", is_active: false},
    {name: "Ready", is_active: false},
    {name: "Delivered", is_active: false},
]

export function ChefHome(){
    const dispatch = useDispatch();
    const socket = useContext(SocketContext);
    const [items, setItems] = useState<NavItem[]>(navItems);
    const selectItem = (name: string) => {
        setItems(items.map(x=>{
            if(x.is_active) x.is_active = false;
            if(x.name === name) x.is_active = true;
            return x;
        }))
    }

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
    }, []);
    let Content: JSX.Element;
    if(items.find(x=>x.name == "All")?.is_active) Content = (
        <>
            <OrderList status="Pending" />
            <OrderList status="Cooking" />
            <OrderList status="Ready" />
            <OrderList status="Delivered" />
        </>
    )
    else Content = <OrderList status={items.find(x=>x.is_active)?.name as any || "Pending"} />
    return(
        <View className="flex-1 bg-white-200">
             <View className='w-full bg-white-100 border-b-[1px] border-b-white-300'>
                <FlatList
                data = {items}
                renderItem = {({item})=><NavItem onPress={selectItem} data = {item} />}
                horizontal
                showsHorizontalScrollIndicator = {false}
                />
            </View>
            <ScrollView className="bg-white-200 p-4">
            {Content}
            </ScrollView>
        </View>
        
    )
}

function NavItem({data, onPress}: {data: NavItem, onPress: (name: string)=>void}){
    return(
        <TouchableOpacity onPress={()=>onPress(data.name)}>
            <View className={'justify-center items-center py-2' + (data.is_active?" border-b-2 border-primary-200":"")} style = {styles.navItems}>
                <Text className={'text-base font-medium' + (data.is_active?' text-primary-200':' text-gray-200')}>{data.name}</Text>
            </View>
        </TouchableOpacity>
       
    )
}


const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    navItems: {
        width: width/3,
    }
})