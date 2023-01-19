import { Text } from "react-native";
import { Image } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnBoarindScreen(){
    return(
        <SafeAreaView className="flex-1 bg-white-100">
            <Image className="w-full h-[300px]" source={require("assets/onboarding.jpg")} />
            <View className="p-8">
                <Text className="text-center text-4xl font-bold">Restaurant</Text>
            </View>
        </SafeAreaView>
    )
}