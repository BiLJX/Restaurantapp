import { TextField } from "@mui/material";
import { createFoodCategory } from "api/menu";
import { TwoWayButton } from "components/Form/buttons";
import { toastError, toastSuccess } from "components/Toast/toast";
import { useState } from "react";
import ReactModal from "react-modal";
import { useDispatch } from "react-redux";
import { addFoodCategory } from "redux/foodCategoriesReducer";

export function CreateCategoryModal({onClose}: {onClose: ()=>void}){
    const [categoryName, setCategoryName] = useState("");
    const dispatch = useDispatch();
    const onCreate = async() => {
        const res = await createFoodCategory(categoryName);
        if(res.error) return toastError(res.message);
        toastSuccess("Created category");
        dispatch(addFoodCategory(res.data));
        onClose();
    }
    return(
        <ReactModal className="container elevated category-create-modal" overlayClassName="modal-overlay" isOpen>
            <header>
                <h2>Create Category</h2>
            </header>
            <TextField onChange={e=>setCategoryName(e.target.value)} autoCapitalize="1" variant="outlined" label = "Category Name"  style={{marginBottom: "1rem"}}/>
            <TwoWayButton vairant="secondary" onCreate={onCreate} onCancel={onClose}>Create</TwoWayButton>
        </ReactModal>
    )
}