import React from "react";
import { Text } from "react-native";
import { TouchableHighlight } from "react-native"
interface ButtonProps {
    onPress?: (...args: any) => void;
    children?: any;
    variant?: "primary"|"secondary"|"secondary-2",
    className?: string
}
export function Button({
    onPress,
    children,
    variant = "primary",
    className = ""
}: ButtonProps){
    const generateColor = () => {
        if(variant === "primary") return "bg-primary-200";
        if(variant === "secondary" ) return "bg-secondary-blue";
        return "bg-secondary-orange"
    }
    return(
        <TouchableHighlight className={`w-full rounded-2xl ${generateColor()} py-3 mb-5 ${className}`} onPress={onPress}>
            <Text className="text-center text-xl text-white-100 font-bold">{children}</Text>
        </TouchableHighlight>
    )
}