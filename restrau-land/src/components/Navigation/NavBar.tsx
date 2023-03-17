import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar(){
    const defaultNavState = {
        bg: "[transparent]",
        color: "white-100"
    }
    const [navState, setNavState] = useState(defaultNavState)
    const toggleNavBarBg = (state: boolean) => {
        if(state) return setNavState({
            bg: "white-100",
            color: "gray-700"
        })
        return setNavState(defaultNavState)
    }  
    useEffect(()=>{
        const handler = () => {
            toggleNavBarBg(window.scrollY > 0);
        }
        window.addEventListener("scroll", handler);
        return(()=>{
            window.removeEventListener("scroll", handler);
        })
    }, [])
    return(
        <nav className={`bg-${navState.bg} text-${navState.color} ease-in duration-300 z-[3] top-0 left-0 pl-20 pr-6 flex justify-between flex-row fixed w-[100vw] items-center`}>
            <div className="flex">
                <Link href = "/" className={`font-bold text-3xl`}>Restrau</Link>
            </div>
            <div className="flex flex-row">
                <NavItem label="Home" path = "/" />
                <NavItem label="Products" path = "/products" />
                <NavItem label="Contact" path = "/contact" />
                <NavItem label="Pricing" path = "/pricing" />
            </div>
        </nav>
    )
}

interface ItemProps {
    label: string,
    path: string
}
function NavItem({
    label,
    path
}: ItemProps){
    return(
        <Link href = {path} className = "p-4 fle" >
            {label}
        </Link>
    )
}