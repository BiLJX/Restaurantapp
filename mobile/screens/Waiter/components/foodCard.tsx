import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Food } from '@shared/Menu'

type Props = {
    data: Food
}
const { width } = Dimensions.get("window");

const FoodCard = ({
    data
}: Props) => {
    return (
        <TouchableOpacity style = {{width: width/2}}>
            <View className='h-[210px] w-[95%] bg-white-100 p-4 rounded-md shadow-sm'>
                <Image className='w-full rounded-md h-[100px]' source={{uri: data.image_url}} />
                <Text className='text-center mt-4 text-base font-semibold text-gray-700'>{data.name}</Text>
                <Text className='text-center mt-2 text-base text-gray-200'>Rs {data.price}</Text>
            </View>
        </TouchableOpacity>
       
    )
}



export default FoodCard