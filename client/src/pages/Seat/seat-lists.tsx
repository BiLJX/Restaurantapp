import SearchIcon from '@mui/icons-material/Search';
import "./seat-list-modal.scss";
import { useEffect, useState } from "react";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { toastError } from "components/Toast/toast";
import ElevatedContainer from "components/Container/Elevated";
import { Seat } from "@shared/Seat";
import { CreateSeat } from './create-seat';
import { createSeat, deleteSeat, retrieveSeats } from 'api/seat';


export default function SeatList(){
    const [create_modal_active, setCreate_modal_active] = useState(false);
    const [seats, setSeats] = useState<Seat[]>([]);
    const toggleCreateModal = (state: boolean) => setCreate_modal_active(state); 
    const onCreate = async(name: string) => {
        const res = await createSeat(name);
        if(res.error) return toastError(res.message);
        setSeats([res.data, ...seats]);
        toggleCreateModal(false);
    }

    const onDelete = async(id: string) => {
        if(!window.confirm("Are you sure you want to delete?")) return;
        const res = await deleteSeat(id);
        if(res.error) return toastError(res.message);
        const newSeats = seats.filter(x=>x.seat_id !== id);
        console.log(newSeats);
        setSeats(newSeats);
    }

    useEffect(()=>{
        retrieveSeats()
        .then(res=>{
            if(res.error) return toastError("Error while fetching seats");
            setSeats(res.data);
        })
    }, [])
    
    return(
        <ElevatedContainer className="seat-list-modal">
            {create_modal_active && <CreateSeat onCreate={onCreate} onClose={()=>toggleCreateModal(false)} />}
            {/* <header className = "searchbar">
                <div className = "icon center">
                    <SearchIcon />
                </div>
                <input type = "text" placeholder="Search seats..." />
            </header> */}
            <div className = "list-container">
                <div onClick={()=>toggleCreateModal(true)} className = "list center" style = {{color: "var(--secondary-blue)", fontWeight: "bold"}}>
                    Add Seat
                </div>
                {
                    seats.map((x, i)=><List onDelete={onDelete} data = {x} key = {i} />)
                }
            </div>
        </ElevatedContainer>
    )
}

function List({data, onDelete}: {data: Seat, onDelete: (id: string) => void}){
    return(
        <div className = "list">
            <div className="list-name">{data.seat_name}</div>
            <div className="list-id">{data.seat_id}</div>
            {<div className="list-delete" onClick = {()=>onDelete(data.seat_id)}><DeleteRoundedIcon /></div>}
        </div>
    )
}
