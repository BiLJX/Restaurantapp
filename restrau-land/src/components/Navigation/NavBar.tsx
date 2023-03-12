import Link from "next/link";

export default function NavBar(){
    return(
        <nav className="z-[3] top-0 left-0 pl-20 pr-6 flex justify-between flex-row fixed w-[100vw] items-center">
            <div className="flex">
                <Link href = "/" className="text-white-100 font-bold text-3xl">Restrau</Link>
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
        <Link href = {path} className = "p-4 flex text-white-100" >
            {label}
        </Link>
    )
}