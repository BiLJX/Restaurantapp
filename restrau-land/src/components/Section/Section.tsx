import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
const divVairants = {
    visible: { opacity: 1, scale: 4, transition: { duration: 1 } },
    hidden: { opacity: 0, scale: 0 }
};
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
    img_src: any,
    reverse?: boolean
}
export function ContentSection({
    title,
    sub_title,
    additional_button_label,
    img_src,
    reverse
}:ContentSectionProps){
    const imageKey = useRef(reverse?"y":"x");
    const contentKey = useRef(reverse?"x":"y");
    return(
        <section className={`w-[full] ${reverse?"":"flex-row-reverse"} flex items-center space-x-3 p-10 bg-white-100`}>
            <motion.div 
            initial={{[imageKey.current]: 300, opacity: 0}}
            whileInView={{ [imageKey.current]: 0, opacity: 1 }}
            transition={{ease: "linear", duration: .7}}
            viewport={{ once: true }}
            className="img-container p-6">
                <Image alt="Menu show case" src = {img_src} width = {800/1.3} height = {544/1.3} className = "object-contain" />
            </motion.div>
            <motion.div 
            className="flex-1 flex flex-col space-y-8 px-8 py-8" 
            initial={{[contentKey.current]: 200, opacity: 0}}
            whileInView={{ [contentKey.current]: 0, opacity: 1 }}
            transition={{ease: "linear", duration: .6}}
            viewport={{ once: true }}
            >
                <h1 className="font-medium text-4xl text-gray-700">{title}</h1>
                <p className="text-2xl text-gray-blue">{sub_title}</p>
                <a className="text-xl text-secondary-blue font-semibold">{additional_button_label}</a>
            </motion.div>
        </section>
    )
} 