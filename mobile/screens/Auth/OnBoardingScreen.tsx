import { Text } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/Buttons/buttons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<AuthStackParamList, "On Boarding">;
export default function OnBoarindScreen({navigation}: Props){
    return(
        <SafeAreaView className="flex-1 bg-white-100">
            
            <Image className="w-full h-[300px]" source={require("assets/onboarding.jpg")} />
            <View className="p-9">
                <Text className="m-0 p-0 text-center text-5xl font-bold text-primary-200">Resta<Text className="text-secondary-blue">urant</Text></Text>
                <Text className="text-center mt-4 text-gray-blue text-sm">Difficult to manage your restaurant? Let us help you change that</Text>
                <View className="w-full flex-row my-12 items-center">
                    <View className="flex-1 h-[1px] bg-gray-blue"  />
                    <Text className = "mx-2 text-gray-blue text-lg font-semibold">Login As</Text>
                    <View className="flex-1 h-[1px] bg-gray-blue"  />
                </View>
                <Button onPress={()=>navigation.navigate("Login Chef")}>Chef</Button>
                <Button  onPress={()=>navigation.navigate("Login Waiter")} variant="secondary">Waiter</Button>
            </View>
        </SafeAreaView>
    )
}