import SearchField from "../../components/Search/searchField";
import { View, FlatList } from "react-native";
import { HideKeyboard } from "../../components/Container/HideKeyboard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getSeats } from "../../api/seat-api";
import { toastError } from "../../components/Toast/toast";
import { addSeatAray } from "../../redux/seatReducer";
import { useEffect, useState } from "react"
import TableCard from "../../components/Table/TableCard";
export default function SeatScreen(){
    const seats = useSelector((state: RootState)=>state.seats);
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const fetchSeats = async() => {
        const res = await getSeats(search);
        if(res.error) return toastError(res.message);
        dispatch(addSeatAray(res.data));
    }
    useEffect(()=>{
        fetchSeats()
    }, [search])
    return(
        <HideKeyboard>
            <View className="flex-1 bg-white-200 px-4">
                <View className="py-4">
                    <SearchField label="Search" onSearch={setSearch} />
                </View>
                <FlatList
                data={seats}
                key = {"#"}
                renderItem = {({item})=><TableCard data={item} />}
                numColumns = {2}
                showsVerticalScrollIndicator = {false}
                />            
            </View>
        </HideKeyboard>
    )
}