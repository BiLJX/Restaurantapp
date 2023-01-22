import { View, Text, Dimensions, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react'
import { getOrders } from 'api/order-api';
import { toastError } from 'components/Toast/toast';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderList } from 'redux/orderReducer';
import OrderList from 'components/OrderList/OrderList';
import { HideKeyboard } from 'components/Container/HideKeyboard';
import SearchField from 'components/Search/searchField';
import { RootState } from 'redux/store';
import TableCard from 'components/Table/TableCard';
import { Seat } from '@shared/Seat';
import { getSeats } from 'api/seat-api';
import { OrderItem } from '@shared/Order';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from 'components/Buttons/buttons';

type Props = NativeStackScreenProps<WaiterStackParamList, "Orders">

interface NavItem {
    name: string,
    is_active: boolean
}

const navItems: NavItem[] = [
    {name: "All", is_active: true},
    {name: "Seats", is_active: false},
]

const OrderListScreen = ({navigation}: Props) => {
    const [items, setItems] = useState<NavItem[]>(navItems);
    const dispatch = useDispatch();
    const fetchOrder = async() => {
        const res = await getOrders();
        if(res.error) return toastError(res.message);
        dispatch(addOrderList(res.data));
    }
    const selectItem = (name: string) => {
        setItems(items.map(x=>{
            if(x.is_active) x.is_active = false;
            if(x.name === name) x.is_active = true;
            return x;
        }))
    }
    useEffect(()=>{
        fetchOrder();
    }, [])
    return (
        <View className='flex-1 bg-white-200'>
            <View className='w-full bg-white-100 border-b-[1px] border-b-white-300'>
               <FlatList
               data = {items}
               renderItem = {({item})=><NavItem onPress={selectItem} data = {item} />}
               horizontal
               showsHorizontalScrollIndicator = {false}
               />
            </View>
            {
                items.find(x=>x.name === "All")?.is_active?(
                    <ScrollView className='flex-1 p-4'>
                        <OrderList status='Ready'/>
                        <OrderList status='Cooking'/>
                        <OrderList status='Pending'/>
                        <OrderList status='Delivered'/>
                    </ScrollView>
                ): <TablesScreen onSeatSelect={seat_id=>navigation.navigate("Orders By Seat", {seat_id})} />
            }

        </View>
    )
}

function TablesScreen({onSeatSelect}: {onSeatSelect: (seat_id: string)=>void}){
    const [_seats, set_seats] = useState<Seat[]>([])
    const [seats, setSeats] = useState(_seats);
    const onSearch = (name: string) => {
        setSeats(_seats.filter(x=>x.seat_name.includes(name)));
    }
    
    useEffect(()=>{
        getSeats("").then(res=>{
            if(res.error) toastError("Error while fetching seats");
            setSeats(res.data);
        })  
    }, [])
    return(
        <HideKeyboard>
            <View className="flex-1 bg-white-200 px-4">
                <View className="py-4">
                    <SearchField label="Search" onSearch={onSearch} />
                </View>
                <FlatList
                data={seats}
                key = {"a"}
                renderItem = {({item})=><TableCard onPress={onSeatSelect} data={item} />}
                numColumns = {2}
                showsVerticalScrollIndicator = {false}
                />            
            </View>
        </HideKeyboard>
    )
}

type OrderBySeatScreenProps = NativeStackScreenProps<WaiterStackParamList, "Orders By Seat">
export function OrderBySeatScreen({navigation, route}: OrderBySeatScreenProps){
    const [orders, setOrders] = useState<OrderItem[]>([]);
    const { seat_id } = route.params;
    const fetchOrder = async() => {
        const res = await getOrders({seat_id});
        setOrders(res.data);
    }
    useEffect(()=>{
        fetchOrder();
    }, [])
    return(
        <View className='flex-1 bg-white-200'>
            <View className='flex-1 p-4'>
                <ScrollView showsVerticalScrollIndicator = {false}>
                    <OrderList data={orders} status='Ready'/>
                    <OrderList data={orders} status='Cooking'/>
                    <OrderList data={orders} status='Pending'/>
                    <OrderList data={orders} status='Delivered'/>
                </ScrollView>
            </View>

            {orders.every(x=>x.status === "Delivered") && <View className='p-4'><Button>Bill</Button></View>}
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
        width: width/2,
    }
})

export default OrderListScreen