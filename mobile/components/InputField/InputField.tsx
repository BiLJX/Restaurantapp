import { View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { ICON_COLORS } from "../../constants/colors";
import { TextInput } from "react-native";

interface Props {
    onChange: (value: string) => void;
    placeholder: string;
    icon: JSX.Element;
    secureTextEntry?: boolean
}
export default function AuthInput({
    onChange,
    placeholder,
    icon,
    secureTextEntry
}: Props){
    return(
        <View className="flex-row items-center mb-4">
            {icon}
            <TextInput 
            autoCorrect = {false} 
            importantForAutofill="no" 
            autoCapitalize="none" 
            autoComplete="off"  
            className="ml-2 h-9 border-b-[1px] border-solid border-gray-100 flex-1 mb-2 text-base" 
            placeholder={placeholder}
            onChangeText={onChange}
            secureTextEntry = {secureTextEntry}
            />
        </View>
    )
}