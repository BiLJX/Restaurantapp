import { Employee } from "@shared/User";
import { View, Text, TouchableHighlight, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { Ionicons } from '@expo/vector-icons';
import { ICON_COLORS } from "../../constants/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { logout } from "../../api/auth-api";
import { removeCurrentEmployee } from "../../redux/employeeReducer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<ChefStackParamList>;
export default function ChefHome({navigation}: Props){
    const employee = useSelector((state: RootState)=>state.current_employee.data) as Employee;
    const dispatch = useDispatch();
    const onLogout = async() => {
        await logout();
        dispatch(removeCurrentEmployee())
    }
    return(
        <View className="flex-1 bg-white-100">
            <ScrollView showsVerticalScrollIndicator = {false}>
                <View className="flex-1 bg-white-100 p-12 items-center">
                    <Text className="text-3xl font-bold text-center text-secondary-blue">Welcome to {employee.restaurant.name}</Text>
                    <TouchableHighlight className="mt-16" onPress={()=>navigation.navigate("Orders")}>
                        <View className="border-[3px] bg-white-200 border-secondary-blue w-[172] h-[172] rounded-lg justify-center items-center">
                            <MaterialCommunityIcons name="notebook-edit" size={80} color={ICON_COLORS.secondary_blue} />
                            <Text className="text-secondary-blue font-bold text-lg mt-2">View Orders</Text>
                        </View>
                    </TouchableHighlight>
                    <Text className="mt-12 text-xl font-semibold text-gray-blue" onPress={onLogout}>Logout</Text>
                </View>
            </ScrollView>
        </View>


    )
}
 
