import Section, { ContentSection } from "@/components/Section/Section";
import { useEffect } from "react";
import FeatureLists from "./FeatureList";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heading, LearnMoreButton, Para } from "@/components/Content/content";

export default function Home(){
    return(
        <>
            <InitialSection />
        
            <ContentSection
            title="Best Online Restaurant Order taking solution for Nepal"
            sub_title="Easy to use and best UI of the app makes it the favorite choice for many restaurant owners in Nepal."
            additional_button_label="Contact us for integration"
            img_src="/contents/Menu.png"
            />

            <FeatureLists />

            <ContentSection
            title="Real time order tracking for waiters and chefs"
            sub_title="Change order status or track if the food is pending to be cooked or cooking, cooked, delivered from the app. "
            additional_button_label="Learn more on Real Time Tracking"
            img_src="/contents/Menu.png"
            reverse
            />

            <ContentSection
            title="Manage Food Items of your Restuarant"
            sub_title="Manage Food Items of your restaurant by creating, editing and deleting. Also add a category for them."
            additional_button_label="Learn more on managing foods"
            img_src="/contents/Menu.png"
            />

            <AnalyticsSection />
        </>
    )
}

function InitialSection(){
    return(
        <Section className="flex justify-center items-center bg-fixed bg-[url('../../public/background/home.jpg')] bg-contain">
            <div className="absolute w-[100vw] h-[100vh] top-0 left-0 bg-gray-700/50 bg-fixed" />
            <div className="z-[2] text-white-100 space-y-6 flex flex-col">
                <h1 className="text-5xl font-bold text-center">Restrau App</h1>
                <span className="text-white-400 text-lg">Taking orders made easy with Restrau</span>
                <div className="flex space-x-4">
                    <button className="border-2 border-white-100 flex-1 p-2 rounded-md">Discover More</button>
                    <button className="bg-primary-200 flex-1 p-2 rounded-md">Try Now</button>
                </div>
            </div>
        </Section>
    )
}

function AnalyticsSection(){
    return(
        <Section className="flex flex-col items-center">
            <motion.div className="img-container p-6">
                <Image src = "/contents/Menu.png"  width = {800/1.3} height = {544/1.3} className = "object-contain" alt="image"  />
            </motion.div>
            <motion.div className="flex flex-col text-center space-y-12 px-[15rem]">
                <div className="px-[5rem]">

                    <Heading>Track your restaurants performance from Analytics</Heading>
                </div>
                <Para>Our powerful analytical dashboard provides you best analytics and performance graphs and charts of your restaurant. You can view your total sales, total orders, revenue etc.</Para>
                <LearnMoreButton>Learn more About analytics</LearnMoreButton>
            </motion.div>
        </Section>
    )
}