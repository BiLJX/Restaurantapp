import { View, Text, Image, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Food } from '@shared/Menu';
import { Button } from 'components/Buttons/buttons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { addFoodToTakeOrder, updateFoodOfTakeOrder } from 'redux/takeorderReducer';
import { toastError } from 'components/Toast/toast';

type Props = NativeStackScreenProps<WaiterStackParamList, "Food">;

const FoodScreen = ({navigation, route}: Props) => {
    const food = route.params as Food;
    const dispatch = useDispatch();
    const takeorders_foods = useSelector((state: RootState)=>state.takeorder.foods);
    const food_exists = takeorders_foods.find(x=>x.food_id === food.food_id)?true:false;
    const [quantity, setQuantity] = useState(takeorders_foods.find(x=>x.food_id === food.food_id)?.quantity || 0)
    
    const addToList = () => {
        if(quantity === 0) return toastError("Please add quantity");
        if(food_exists) {
            return dispatch(updateFoodOfTakeOrder({...food, quantity}));
        }
        dispatch(addFoodToTakeOrder({...food, quantity}));
        navigation.goBack();
    }

    return (
        <View className='flex-1 bg-white-200'>
            <Image className='w-full h-[260]' source={{uri: food.image_url}} />
            <View className='p-4 border-b-[1px] border-b-gray-100'>
                <Text className='text-gray-700 text-2xl mb-2 font-semibold'>{food.name}</Text>
                <Text className='text-gray-700 text-xl font-semibold mb-4'>Rs {food.price}</Text>
                <Text className='text-gray-700 text-base font-semibold mb-2'>Description</Text>
                <Text className='text-gray-blue  text-sm'>{food.description}</Text>
            </View>
            <View className='flex-1 py-5 px-4 justify-between'>
                <Text className='text-gray-700 text-xl'>Quantity</Text>
                <View className='flex-row px-10'>
                    <TouchableHighlight onPress={()=>quantity && setQuantity(quantity - 1)}>
                        <View className="w-[45px] h-[45px] bg-primary-200 justify-center items-center rounded-lg">
                            <AntDesign name="minus" size={40} color="#fff" />
                        </View>
                    </TouchableHighlight>
                    <Text className='flex-1 text-center text-5xl text-gray-blue'>{quantity}</Text>
                    <TouchableHighlight onPress={()=>setQuantity(quantity + 1)}>
                        <View className="w-[45px] h-[45px] bg-primary-200 justify-center items-center rounded-lg">
                            <Entypo name="plus" size={40} color="#fff" />
                        </View>
                    </TouchableHighlight>
                </View>
                <Button onPress={addToList}>{food_exists?"Edit Item":"Add to list"}</Button>
            </View>
        </View>
    )
}

export default FoodScreen