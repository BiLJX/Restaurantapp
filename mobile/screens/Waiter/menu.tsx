import { View, Text, Dimensions, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FoodListScreen from './FoodListScreen';
import { FoodCategory } from '@shared/Menu';
import { getFoodCategories } from 'api/menu';
import { toastError } from 'components/Toast/toast';
type Props = NativeStackScreenProps<WaiterStackParamList>;
const Tab = createBottomTabNavigator();

interface FoodCategoryItem {
    name: string;
    food_category_id: string
    is_active: boolean
}

const MenuScreen = ({navigation}: Props) => {
    const [categories, setCategories] = useState<FoodCategoryItem[]>([]);
    const selectCategory = (id: string) => {
        setCategories(categories.map(x=>{
            if(x.is_active) x.is_active = false;
            if(x.food_category_id === id) x.is_active = true;
            return x;
        }))
    }
    useEffect(()=>{
        getFoodCategories().then(res=>{
            if(res.error) return toastError("Error while fetching food categories");
            const data: FoodCategoryItem[] = res.data.map(x=>({name: x.name, food_category_id: x.food_category_id, is_active: false}))
            setCategories([{name: "All", food_category_id: "all", is_active: true} ,...data]);
        })
    }, [])
    return (
        <View className='flex-1 bg-white-200'>
            <View className='w-full bg-white-100 border-b-[1px] border-b-white-300'>
               <FlatList
               data = {categories}
               renderItem = {({item})=><NavItem onPress={selectCategory} data = {item} />}
               horizontal
               showsHorizontalScrollIndicator = {false}
               />
            </View>
            <View className='flex-1'>
                <Tab.Navigator initialRouteName='All' screenOptions={{headerShown: false,tabBarStyle: {display: "none"}}}>
                    <Tab.Screen name='All' component={FoodListScreen} />
                </Tab.Navigator>
            </View>
        </View>
  )
}

function NavItem({data, onPress}: {data: FoodCategoryItem, onPress: (id: string)=>void}){
    return(
        <TouchableOpacity onPress={()=>onPress(data.food_category_id)}>
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

export default MenuScreen