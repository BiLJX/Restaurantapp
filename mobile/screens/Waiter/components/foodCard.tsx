import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Food } from '@shared/Menu'

type Props = {
    data: Food;
    onPress: (data: Food) => void;
}
const { width } = Dimensions.get("screen");

const FoodCard = ({
    data,
    onPress
}: Props) => {
    return (
        <TouchableOpacity onPress={()=>onPress(data)} style = {{width: (width - 16)/2}} className = "mb-[16]">
            <View className='h-[200px] w-[90%] bg-white-100 p-4 rounded-md shadow-sm'>
                <Image className='w-full rounded-md h-[100px]' source={{uri: data.image_url}} />
                <Text className='text-center mt-4 text-base font-semibold text-gray-700'>{data.name}</Text>
                <Text className='text-center mt-2 text-base font-semibold text-gray-200'>Rs {data.price}</Text>
            </View>
        </TouchableOpacity>
       
    )
}



export default FoodCard