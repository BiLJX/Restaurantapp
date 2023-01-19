import React from "react";
import "./buttons.scss";
interface ButtonProps{
    className?: string;
    variant?: "primary"|"secondary-blue"|"secondary-orange";
    onClick?: (...params: any)=>void;
    borderRadius?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}
export function Button({
    className = "",
    variant = "primary",
    onClick,
    borderRadius,
    style,
    children
}: ButtonProps){
    const _style: React.CSSProperties = {
        ...style,
        borderRadius,
    }
    return(
        <button 
        className={`general-button ${className}`} 
        id = {variant}
        style = {_style}
        >
            {children}
        </button>
    )
}