import { View, Text, TextInput } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { ICON_COLORS } from "../../constants/colors";

interface Props {
    label: string,
    onSearch: (text: string)=>void
}
export default function SearchField({
    label,
    onSearch
}:Props){
    return(
        <View className="flex-row bg-white-100 p-2 rounded-lg shadow-sm">
            <MaterialIcons name="search" size={24} color={ICON_COLORS.input} />
            <TextInput className="flex-1 ml-1" placeholder={label} onChangeText = {onSearch} />
        </View>
    )
}