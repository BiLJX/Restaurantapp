import { View, Text } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
type Props = NativeStackScreenProps<WaiterStackParamList>;
const Tab = createBottomTabNavigator();
const MenuScreen = ({navigation}: Props) => {
    return (
        <View className='flex-1 bg-white-200'>
            <View>
                <View>
                    <Text>All</Text>
                </View>
            </View>
        </View>
  )
}

export default MenuScreen