import { View, Text, TouchableHighlight } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ICON_COLORS } from '../../constants/colors';
import { Seat } from '@shared/Seat';

type Props = {
    data: Seat
}

const TableCard = ({
    data
}: Props) => {
    return (
        <TouchableHighlight className='p-2'>
            <View className='bg-white-100 w-[163px] h-[160px] justify-center items-center shadow-sm rounded-md'>
                <MaterialCommunityIcons name="table-furniture" size={85} color={ICON_COLORS.input} />
                <Text className="text-gray-400 font-bold text-lg">{data.seat_name}</Text>
            </View>
        </TouchableHighlight>
    )
}

export default TableCard