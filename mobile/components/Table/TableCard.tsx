import { View, Text, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ICON_COLORS } from '../../constants/colors';
import { Seat } from '@shared/Seat';

type Props = {
    data: Seat,
    onPress: (seat_id: string) => void
}

const TableCard = ({
    data,
    onPress
}: Props) => {
    return (
        <TouchableOpacity className='p-2' onPress={()=>onPress(data.seat_id)}>
            <View className='bg-white-100 w-[163px] h-[160px] justify-center items-center shadow-sm rounded-md'>
                {/* <MaterialCommunityIcons name="table-chair" size={85} color={ICON_COLORS.secondary_blue} /> */}
                <Text className="text-secondary-blue font-bold text-5xl">{data.seat_name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default TableCard