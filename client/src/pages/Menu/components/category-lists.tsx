import ReactModal from "react-modal";
import SearchIcon from '@mui/icons-material/Search';
import "./category-list-modal.scss";
import { useState } from "react";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { CreateCategoryModal } from "./create-category";
import { FoodCategory } from "@shared/Menu";
import { useDispatch, useSelector } from "react-redux";
import { deleteFoodCategory } from "api/menu";
import { toastError } from "components/Toast/toast";
import { RootState } from "redux/store";
import { removeFoodCategory } from "redux/foodCategoriesReducer";


export default function CategoryListModal({onClose}: {onClose: ()=>void}){
    const [create_modal_active, setCreate_modal_active] = useState(false);
    const categories = useSelector((state: RootState)=>state.food_categories);
    const toggleCreateModal = (state: boolean) => setCreate_modal_active(state); 
    if(create_modal_active) return <CreateCategoryModal onClose={()=>toggleCreateModal(false)} />

    return(
        <ReactModal 
        shouldCloseOnEsc 
        shouldCloseOnOverlayClick 
        onRequestClose={onClose} 
        className="container elevated category-list-modal" 
        overlayClassName="modal-overlay" 
        isOpen>
            {/* <header className = "searchbar">
                <div className = "icon center">
                    <SearchIcon />
                </div>
                <input type = "text" placeholder="Search food categories..." />
            </header> */}
            <div className = "list-container">
                <div onClick={()=>toggleCreateModal(true)} className = "list center" style = {{color: "var(--secondary-blue)", fontWeight: "bold"}}>
                    Add Category
                </div>
                {
                    categories.map((x, i)=><List data = {x} key = {i} />)
                }
            </div>
        </ReactModal>
    )
}

function List({data}: {data: FoodCategory}){
    const dispatch = useDispatch();
    const onDelete = async() => {
        if(!window.confirm("Are you sure you want to delete?")) return;
        const res = await deleteFoodCategory(data.food_category_id);
        if(res.error) return toastError(res.message);
        dispatch(removeFoodCategory(data.food_category_id));
    }
    return(
        <div className = "list">
            <div className="list-name">{data.name}</div>
            <div className="list-items">{data.total_items} items</div>
            {data.is_deletable && <div className="list-delete" onClick = {onDelete}><DeleteRoundedIcon /></div>}
        </div>
    )
}
