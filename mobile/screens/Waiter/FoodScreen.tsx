import { View, Text, Image } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Food } from '@shared/Menu';
import { Button } from 'components/Buttons/buttons';

type Props = NativeStackScreenProps<WaiterStackParamList, "Food">;

const FoodScreen = ({navigation, route}: Props) => {
    const food = route.params as Food;
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
                <Button>Add to list</Button>
            </View>
        </View>
    )
}

export default FoodScreen