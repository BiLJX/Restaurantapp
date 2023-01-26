import { Text, View } from "react-native";
import { ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Bill, OrderItem } from "@shared/Order";
import { getBill, payBill } from "api/order-api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { toastError } from "components/Toast/toast";
import { Button } from "components/Buttons/buttons";
import { useDispatch } from "react-redux";
import { removeOrderBySeat } from "redux/orderReducer";

type Props = NativeStackScreenProps<WaiterStackParamList, "Bill">;
export default function BillScreen({navigation, route}:Props){
    const [bill, setBill] = useState<Bill>();
    const [paying, setPaying] = useState(false);
    const seat_id = route.params.seat_id || "";
    const dispatch = useDispatch();
    const onPaid = async() => {
        if(paying) return;
        setPaying(true);
        const res = await payBill(seat_id);
        setPaying(false);
        if(res.error) return toastError(res.message);
        dispatch(removeOrderBySeat({seat_id}));
        navigation.pop(2);
    }
    useEffect(() => {
        getBill(seat_id).then(res=>{
            if(res.error) return toastError(res.message);
            setBill(res.data);
        })
    },[])
    
    return(
       
        <View className="flex-1 bg-white-100 justify-between">
            <ScrollView>
                <View className="w-full">
                    <View className="bg-secondary-blue p-4 flex-row">
                        <Text className="font-bold text-white-100 w-[35%]">Item</Text>
                        <Text className="font-bold text-white-100 w-[25%]">Quantity</Text>
                        <Text className="font-bold text-white-100 w-[20%]">Rate</Text>
                        <Text className="font-bold text-white-100 w-[20%]">Amount</Text>
                    </View>
                    <View>
                        {bill && bill.orders.map((x, i)=><RowItem data={x} key = {i} />)}
                    </View>
                    <View className="p-4 w-full">
                        <Text className="text-2xl">
                        Total: 
                        <Text className="text-secondary-blue"> Rs {bill?.total_price} </Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <View className="bg-white-100 p-4">
                <Button onPress={onPaid}>{paying?"Wait...":"Paid"}</Button>
            </View>
        </View>
        
    )
}

function RowItem({data}: {data: OrderItem}){
    return(
        <View className="p-4 flex-row border-b-[1px] border-b-gray-100">
            <Text className="font-medium w-[35%] text-gray-blue">{data.food.name}</Text>
            <Text className="font-medium w-[25%] text-gray-blue">x{data.quantity}</Text>
            <Text className="font-medium w-[20%] text-gray-blue">Rs {data.food.price}</Text>
            <Text className="font-medium w-[20%] text-gray-blue">Rs {data.quantity * data.food.price}</Text>
        </View>
    )
}