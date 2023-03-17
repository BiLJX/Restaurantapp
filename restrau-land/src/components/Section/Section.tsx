import { motion } from "framer-motion";
import Image from "next/image";
export default function Section({className, id, children}: {className?: string, id?: string, children: any}){
    return(
        <section style={{
            height: "100vh",
            width: "100vw"
        }} className={className} id = {id}>
            {children}
        </section>
    )
}

interface ContentSectionProps {
    title: string,
    sub_title: string,
    additional_button_label: string,
    img_src: any
}
export function ContentSection({
    title,
    sub_title,
    additional_button_label,
    img_src
}:ContentSectionProps){
    return(
        <section className="w-[100vw] h-[100vh] flex">
            <div className="img-container flex-1">
                <Image alt="Menu show case" src = {img_src} width = {567} height = {387} className = "object-cover" />
            </div>
            <div className="flex-1 flex flex-col space-y-4">
                <h1>{title}</h1>
                <p>{sub_title}</p>
                <button>{additional_button_label}</button>
            </div>
        </section>
    )
}