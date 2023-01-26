import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { Bill, OrderItem } from "@shared/Order";
import { getBill } from "api/order-api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { toastError } from "components/Toast/toast";
import { Button } from "components/Buttons/buttons";

type Props = NativeStackScreenProps<WaiterStackParamList, "Bill">;
export default function BillScreen({navigation, route}:Props){
    const [bill, setBill] = useState<Bill>();
    const seat_id = route.params.seat_id || "";
    useEffect(() => {
        getBill(seat_id).then(res=>{
            if(res.error) return toastError(res.message);
            setBill(res.data);
        })
        
    },[])
    
    return(
        <View className="flex-1 bg-white-100 justify-between">
            <View className="w-full">
                <View className="bg-secondary-blue p-4 flex-row">
                    <Text className="font-bold text-white-100 w-[35%]">Item</Text>
                    <Text className="font-bold text-white-100 w-[25%]">Quantity</Text>
                    <Text className="font-bold text-white-100 w-[20%]">Rate</Text>
                    <Text className="font-bold text-white-100 w-[20%]">Amount</Text>
                </View>
                <ScrollView>
                    {
                        bill && bill.orders.map((x, i)=><RowItem data={x} key = {i} />)
                    }
                </ScrollView>
            </View>
            <View className="bg-white-100 p-4">

                <Button>Paid</Button>
            </View>
        </View>
    )
}

function RowItem({data}: {data: OrderItem}){
    return(
        <View className="p-4 flex-row ">
            <Text className="font-medium w-[35%] text-gray-blue">{data.food.name}</Text>
            <Text className="font-medium w-[25%] text-gray-blue">{data.quantity}</Text>
            <Text className="font-medium w-[20%] text-gray-blue">{data.food.price}</Text>
            <Text className="font-medium w-[20%] text-gray-blue">{data.quantity * data.food.price}</Text>
        </View>
    )
}