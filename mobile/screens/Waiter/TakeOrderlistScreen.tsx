import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useContext } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { clearTakeOrder, removeFoodFromTakeOrder } from 'redux/takeorderReducer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { Entypo } from '@expo/vector-icons';
import { TakeOrderItem } from '@shared/Order'
import { Button } from 'components/Buttons/buttons'
import { SocketContext } from 'contexts/socketContext'

type Props = NativeStackScreenProps<WaiterStackParamList, "List">

const TakeOrderlistScreen = ({navigation}: Props) => {
    const order = useSelector((state: RootState)=>state.takeorder);
    const foodorders = order.foods;
    const socket = useContext(SocketContext);
    const dispatch = useDispatch();
    const onOrder = useCallback(()=>{
        // navigation.pop(2);
        socket.emit("order:create", order);
        // dispatch(clearTakeOrder());
    }, [])
    return (
        <View className='flex-1 bg-white-200 p-4'>
            <Text className='text-xl font-semibold text-gray-700'>Items list</Text>
            <View className='flex-1 mt-4'>
                <FlatList 
                data = {foodorders}
                renderItem = {({item})=><OrderCard onPress={data=>navigation.navigate("Food", data)} data = {item} />}
                />
            </View>
            <View className='py-4'>
                <Button onPress={onOrder}>Order</Button>
            </View>
        </View>
    )
}

const OrderCard = ({data, onPress}: {data: TakeOrderItem, onPress: (data: TakeOrderItem)=> void}) => {
    const dispatch = useDispatch();
    return(
        <TouchableOpacity className='w-full rounded-lg mb-3' onPress={()=>onPress(data)}>
            <View className='flex-1 flex-row p-2 rounded-lg bg-white-100 shadow-sm'>
                <Image className='w-[60] h-[60] rounded-lg' source={{uri: data.image_url}} />
                <View className='ml-4'>
                    <Text className='text-base font-medium text-gray-700'>{data.name}</Text>
                    <Text className='text-s mb-1 font-medium text-gray-200'>x{data.quantity}</Text>
                    <Text className='text-s font-medium text-gray-200'>{data.price * data.quantity}</Text>
                </View>
                <View className='h-full justify-center flex-1'>
                    <View className='self-end'>
                        <Entypo name="cross" size={24} color="black" onPress={()=>dispatch(removeFoodFromTakeOrder(data.food_id))} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
      
    )
}

export default TakeOrderlistScreen