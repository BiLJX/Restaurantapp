import React from "react";
import "./container.scss";

interface Props {
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    radius?: number;
}
export default function ElevatedContainer({children, style, className, radius}: Props){
    return(
        <div className = {`container elevated ${className || ""}`} style = {{...style, borderRadius: (radius || 10) + "px"}}>
            {children}
        </div>
    )
}