import { View, Text, TouchableOpacity, Image, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useContext, useMemo, useState } from 'react'
import { OrderItem, OrderStatus } from '@shared/Order'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux/store'
import { STATUS_COLORS } from 'constants/colors'
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { Employee } from '@shared/User'
import { Button } from 'components/Buttons/buttons'
import { SocketContext } from 'contexts/socketContext'
import { addOrderItems, removeOrderItem } from 'redux/orderReducer'

type Props = {
    status: OrderStatus,
    data?: OrderItem[]
}

const OrderList = ({status, data}: Props) => {
    const orders = data?.filter(x=>x.status === status) || useSelector((state: RootState)=>state.orders.filter(x=>x.status === status));
    return (
        <View className='flex-1'>
            <Text className='text-xl text-gray-700 font-bold w-full'>{status}</Text>
            <View className='mt-4 flex-1'>
                {
                    orders.length?orders.map((x, i)=><OrderListItem order={x} key = {i} />):(<Text className='text-center font-semibold text-gray-200'>0 Orders</Text>)
                }
            </View>
            
        </View>
    )
}

function OrderListItem({order}: {order: OrderItem}){
    const data = order.food;
    const [modalOpen, setModalOpen] = useState(false);
    const { role } = useSelector((state: RootState)=>state.current_employee.data as Employee);
    
    const onOpenModal = () => {
        if(role === "Waiter" && order.status !== "Pending") return;
        setModalOpen(true);
    }
    if(!data) return (
        <></>
    )
    return(
        <>
            <ItemModal onClose={()=>setModalOpen(false)} modalOpen = {modalOpen} data = {order} />
            <TouchableOpacity className='w-full rounded-lg mb-3' onPress={onOpenModal}>
                <View className='flex-row p-2 rounded-lg bg-white-100 shadow-sm h-[80px]'>
                    <Image className='w-[60] h-[60] rounded-lg' source={{uri: data.image_url}} />
                    <View className='ml-4'>
                        <Text className='text-base font-medium text-gray-700'>{data.name}</Text>
                        <Text className='text-s mb-1 font-medium text-gray-200'>x{order.quantity}</Text>
                        <Text className='text-s font-medium text-gray-200'>{data.price * order.quantity}</Text>
                    </View>
                    <View className='h-full justify-center flex-1'>
                        <View className='self-end'>
                            <StatusLabel status={order.status} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}

function StatusLabel({status}: {status: OrderStatus}){
    return(
        <View className='rounded-[20px] py-1 px-2' style = {{backgroundColor: STATUS_COLORS[status]}}>
            <Text className='text-white-100 text-xs'>{status}</Text>
        </View>
    )
}

interface ModalProps {
    onClose: () => void;
    data: OrderItem;
    modalOpen: boolean
}
function ItemModal({onClose, data, modalOpen}: ModalProps){
    const { role } = useSelector((state: RootState)=>state.current_employee.data as Employee)
    const socket = useContext(SocketContext);
    const dispatch = useDispatch();
    const onCancel = () => {
        socket.emit("order-item:cancel", {order_item_id: data.order_item_id});
        dispatch(removeOrderItem(data.order_item_id))
        onClose(); 
    }
    const handlers = {
        "Pending": {
            handler(){
                
            }
        }
    }
    let Content: JSX.Element = <></>;
    if(role === "Waiter") Content = (
        <>
            <Text className='mb-4 text-lg font-semibold text-gray-blue'>Cancel The Order?</Text>
            <Button onPress={onCancel} style={{marginBottom: 0}} className='mb-0'>Cancel Order</Button>
        </>
    )
    return(
        <Modal 
        visible = {modalOpen} 
        transparent 
        onRequestClose={onClose}
        >
            <TouchableWithoutFeedback className='flex-1' onPress={onClose}>
                <View className='flex-1 justify-center items-center bg-[#00000080]'>
                    <View className='w-[90%] p-4 bg-white-100 rounded-lg'>
                        {Content}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default OrderList