import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import React from 'react';
import { motion } from "framer-motion";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
export default function FeatureLists(){
    return(
        <section className="w-[full] flex flex-col justify-center p-10 bg-white-200">
            <div className="flex flex-row space-x-6 p-8 pb-0">
                <FeatureCard index={1} Icon={AssignmentOutlinedIcon} title="Easy To Order" sub_title="Easily Take Order from customer" />
                <FeatureCard index={2} Icon={EditOutlinedIcon} title="Edit Orders" sub_title="Edit orders easily if required" />
                <FeatureCard index={3} Icon={NotificationsActiveOutlinedIcon} title="Notification" sub_title="Get Notified for any change in order status" />
                <FeatureCard index={4} Icon={AnalyticsOutlinedIcon} title="Analytics" sub_title="Check your restaurant growth" />
            </div>
            <div className="flex flex-row space-x-6 p-8">
                <FeatureCard index={5} Icon={BadgeOutlinedIcon} title="Manage Employees" sub_title="You can add, remove and change roles of workers" />
                <FeatureCard index={7} Icon={TaskAltOutlinedIcon} title="Attendance" sub_title="Easily take attendance of employee" />
                <FeatureCard index={6} Icon={FastfoodOutlinedIcon} title="Manage Menus" sub_title="You can add, edit or remove item from your menu" />
                <FeatureCard index={8} Icon={ReceiptLongOutlinedIcon} title="Billing" sub_title="Automatically create a bill for order" />
            </div>
        </section>
    )
}

interface Props{
    title: string,
    sub_title: string,
    Icon: any,
    index: number
}
function FeatureCard({
    title,
    sub_title,
    Icon,
    index
}: Props){
    return(
        <motion.div 
        initial = {{opacity: 0}}
        whileInView = {{opacity: 1}}
        transition = {{duration: 1, delay: 0.2*index}}
        className="p-10 space-y-2 text-center flex flex-col flex-1 justify-center items-center bg-white-100 rounded-lg"
        viewport={{once: true}}
        >
            <div className="flex text-gray-700 mb-4"><Icon className = "!text-5xl" /></div>
            <h3 className='text-gray-700 font-bold text-lg'>{title}</h3>
            <p className="text-gray-blue font-medium text-lg leading-6 text-center">{sub_title}</p>
        </motion.div>
    )
}