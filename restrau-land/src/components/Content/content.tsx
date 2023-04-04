export function Heading({children}: {children: string}){
    return(
        <h1 className="font-medium text-4xl text-gray-700">{children}</h1>
    )
}

export function Para({children}: {children: string}){
    return(
        <p className="text-2xl text-gray-blue">{children}</p>
    )
}

export function LearnMoreButton({children}: {children: string}){
    return(
        <a className="text-xl text-secondary-blue font-semibold">{children}</a>
    )
}
