import React from "react";
import "./styles/button.scss";


interface ButtonProps {
    className?: string;
    radius?: number;
    children: React.ReactNode;
    style?: React.CSSProperties;
    vairant?: "primary"|"secondary"|"secondary-2";
    isDisabled?: boolean;
    isLoading?: boolean;
    onClick?: () => void;
}
export function Button({
    className,
    radius,
    children,
    style,
    vairant = "primary",
    isDisabled,
    onClick,
    isLoading
}:ButtonProps){
    return(
        <button 
        className={`form-button ${className || ""} ${vairant}`}
        style = {{borderRadius: (radius || "10")+"px", ...style}}
        disabled = {isDisabled}
        onClick = {()=>onClick?.()}
        >
            {children}
        </button>
    )
}
interface TwoWayButtonProps {
    className?: string;
    radius?: number;
    children: React.ReactNode;
    style?: React.CSSProperties;
    vairant?: "primary"|"secondary"|"secondary-2";
    isDisabled?: boolean;
    isLoading?: boolean;
    onCreate?: () => void;
    onCancel?: () => void;
}
export function TwoWayButton({
    className,
    radius,
    children,
    style,
    vairant = "primary",
    isDisabled,
    onCreate,
    onCancel,
    isLoading
}:TwoWayButtonProps){
    return(
        <div className = "form-buttons-container">
            <div className = "form-cancel-button center" onClick = {()=>onCancel?.()}>
                Cancel
            </div>
            <button 
            className={`form-button ${className || ""} ${vairant}`}
            style = {{borderRadius: (radius || "10")+"px", ...style}}
            disabled = {isDisabled}
            onClick = {()=>onCreate?.()}
            >
                {children}
            </button>       
        </div>
        
    )
}