import Section from "@/components/Section/Section"

export default function Home(){
    return(
        <InitialSection />
    )
}

function InitialSection(){
    return(
        <Section className="flex justify-center items-center bg-[url('../../public/background/home.jpg')] bg-contain">
            <div className="fixed w-[100vw] h-[100vh] top-0 left-0 bg-gray-700/50 bg-fixed" />
            <div className="z-[2] text-white-100 space-y-6 flex flex-col">
                <h1 className="text-5xl font-bold text-center">Restrau App</h1>
                <span className="text-white-400 text-lg">Taking orders made easy with Restrau</span>
                <div className="flex space-x-4">
                    <button className="border border-white-100 flex-1 p-2 rounded-md">Discover More</button>
                    <button className="bg-primary-200 flex-1 p-2 rounded-md">Try Now</button>
                    
                </div>
            </div>
        </Section>
    )
}