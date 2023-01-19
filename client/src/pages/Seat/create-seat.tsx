import { TextField } from "@mui/material";
import { createFoodCategory } from "api/menu";
import { TwoWayButton } from "components/Form/buttons";
import { toastError, toastSuccess } from "components/Toast/toast";
import { useState } from "react";
import ReactModal from "react-modal";


export function CreateSeat({onClose, onCreate}: {onClose: ()=>void, onCreate: (name: string)=>void}){
    const [seatName, setSeatName] = useState("");
    return(
        <ReactModal className="container elevated category-create-modal" overlayClassName="modal-overlay" isOpen>
            <header>
                <h2>Create Seat</h2>
            </header>
            <TextField onChange={e=>setSeatName(e.target.value)} autoCapitalize="1" variant="outlined" label = "Seat Name"  style={{marginBottom: "1rem"}}/>
            <TwoWayButton vairant="secondary" onCreate={()=>onCreate(seatName)} onCancel={onClose}>Create</TwoWayButton>
        </ReactModal>
    )
}