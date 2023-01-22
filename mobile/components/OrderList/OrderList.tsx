import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import { OrderItem, OrderStatus } from '@shared/Order'
import { useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { STATUS_COLORS } from 'constants/colors'

type Props = {
    status: OrderStatus
}

const OrderList = ({status}: Props) => {
    const orders = useSelector((state: RootState)=>state.orders.filter(x=>x.status === status));
    return (
        <View className='flex-1'>
            <Text className='text-xl text-gray-700 font-bold w-full'>{status}</Text>
            <View className='mt-4'>
                {
                    orders.length?orders.map((x, i)=><OrderListItem order={x} key = {i} />):(<Text className='text-center font-semibold text-gray-200'>0 Orders</Text>)
                }
            </View>
        </View>
    )
}

function OrderListItem({order}: {order: OrderItem}){
    const data = order.food;
    if(!data) return (
        <></>
    )
    return(
        <TouchableOpacity className='w-full rounded-lg mb-3'>
            <View className='flex-1 flex-row p-2 rounded-lg bg-white-100 shadow-sm'>
                <Image className='w-[60] h-[60] rounded-lg' source={{uri: data.image_url}} />
                <View className='ml-4'>
                    <Text className='text-base font-medium text-gray-700'>{data.name}</Text>
                    <Text className='text-s mb-1 font-medium text-gray-200'>x{order.quantity}</Text>
                    <Text className='text-s font-medium text-gray-200'>{data.price * order.quantity}</Text>
                </View>
                <View className='h-full justify-center flex-1'>
                    <View className='self-end'>
                        <StatusLabel status={order.status} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

function StatusLabel({status}: {status: OrderStatus}){
    return(
        <View className='rounded-[20px] py-1 px-2' style = {{backgroundColor: STATUS_COLORS[status]}}>
            <Text className='text-white-100 text-xs'>{status}</Text>
        </View>
    )
}

export default OrderList