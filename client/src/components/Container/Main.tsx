import "./main.scss"

interface MainWrapperProps {
    className?: string,
    id?: string,
    style?: React.CSSProperties,
    children: React.ReactNode
}
export function Main({
    className, 
    style, 
    children, 
    id
}: MainWrapperProps){
    return(
        <main id = {id} className={`main-wrapper ${className || ""}`} style = {style}>
            {children}
        </main>
    )
}