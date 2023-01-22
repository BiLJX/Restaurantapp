import { View, Text, Dimensions, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react'
import { getOrders } from 'api/order-api';
import { toastError } from 'components/Toast/toast';
import { useDispatch } from 'react-redux';
import { addOrderList } from 'redux/orderReducer';
import OrderList from 'components/OrderList/OrderList';

type Props = {}

interface NavItem {
    name: string,
    is_active: boolean
}

const navItems: NavItem[] = [
    {name: "All", is_active: true},
    {name: "Seats", is_active: false},
]

const OrderListScreen = (props: Props) => {
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
            <ScrollView className='flex-1 p-4'>
                <OrderList status='Ready'/>
                <OrderList status='Cooking'/>
                <OrderList status='Pending'/>
                <OrderList status='Delivered'/>
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
        width: width/2,
    }
})

export default OrderListScreen