import React, { useEffect, useId, useState } from "react";
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import "./styles/image-upload.scss"
interface Props {
    onImage?: (image: File|undefined|null) => void;
    className?: string;
    id?: string;
    style?: React.CSSProperties;
    value?: string;
    borderRadius?: string;
    width?: string;
    height?: string;
}
export default function ImageUploader({
    onImage,
    className,
    id,
    style,
    value,
    borderRadius,
    width,
    height,
}: Props){
    const i_id = useId();
    const [src, setSrc] = useState(value);
    const _style: React.CSSProperties | undefined = {
        ...style,
        width,
        height,
        borderRadius
    };
    const onChange = (e: any) => {
        const images = e.target.files;
        if(!images) return;
        onImage?.(images[0]);
        setSrc(URL.createObjectURL(images[0]))
    }
    return(
        <>
            <label htmlFor={i_id} className = {`image-uploader center ${className||""}`} id = {id} style = {_style}>
                <input id = {i_id} hidden type = "file" accept = "image/*" onChange={onChange} />
                {src?<img src = {src} className = "full-img" />:<UploadRoundedIcon />}
            </label>
        </>
        
    )
}