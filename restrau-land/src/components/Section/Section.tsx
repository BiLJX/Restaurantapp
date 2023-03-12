export default function Section({className, children}: {className: string, children: any}){
    return(
        <section style={{
            height: "100vh",
            width: "100vw"
        }} className={className}>
            {children}
        </section>
    )
}