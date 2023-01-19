import TextareaAutosize from "react-textarea-autosize";
import ElevatedContainer from "components/Container/Elevated";
import { Main } from "components/Container/Main";
import Header from "components/Header/header";
import { MenuItem, Select, TextField } from "@mui/material";
import { TwoWayButton } from "components/Form/buttons";
import "./edit-food.scss";
import ImageUploader from "components/Form/image-uploader";
import { useEffect, useState } from "react";
import { Food, FoodCategory } from "@shared/Menu";
import { createFood, deleteFood, editFood, getFoodById, getFoodCategories } from "api/menu";
import { toastError, toastSuccess } from "components/Toast/toast";
import { useDispatch } from "react-redux";
import { addFood, removeFood, updateFood } from "redux/Food/foodActions";
import { useNavigate, useParams } from "react-router-dom";
const defaultValue = {
    description: "",
    food_category_id: "cat",
    name: "",
    price: 0,
    image_url: ""
}
export default function EditFoodPage(){
    const dispatch = useDispatch();
    const id = useParams().id || "null"
    const [data, setData] = useState<CreateFoodData>(defaultValue);
    const [categories, setCategories] = useState<FoodCategory[]>([]);
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();
    const getCategories = async() => {
        const res = await getFoodCategories();
        if(res.error) return toastError("Error while fetching categories");
        setCategories(res.data);
    }
    const getFoodData = async() => {
        const res = await getFoodById(id);
        if(res.error) return toastError(res.message);
        setData(res.data)
    }
    const onCreate = async(e: any) => {
        e.preventDefault();
        if(data.food_category_id === "cat") return toastError("Please choose category");
        setEditing(true)
        const res = await editFood(data);
        setEditing(false)
        if(res.error) return toastError(res.message);
        dispatch(updateFood(res.data));
        setData(defaultValue);
        navigate("/menu")
    }
    const onDelete = async() => {
        if(!window.confirm("Are you sure you want to delete?")) return;
        const res = await deleteFood((data as Food).food_id);
        if(res.error) return toastError(res.message);
        dispatch(removeFood(data as Food));
        toastSuccess("Successfully deleted");
        navigate("/menu");
    }
    useEffect(()=>{
        getCategories()
        getFoodData()
    }, [])
    if(!data.name){
        return(
            <>
                <Header title="Create Menu" sub_title="Create food items" />
            </>
        )
    }
    return(
        <>
            <Header title="Create Menu" sub_title="Create food items" />
            <Main id = "edit-food-page" className="center" >
                <form onSubmit={onCreate}>
                    <ElevatedContainer className="menu-form-container">
                        <div className="center">
                            <ImageUploader value={data.image_url} onImage={image=>image && setData({...data, image})} className="food-image-uploader" height="150px" width="80%" borderRadius="10px" />
                        </div>
                        <TextField value = {data.name} onChange={e=>setData({...data, name: e.target.value})} autoComplete="off" autoCapitalize="on" label = "Name" className="form-input" size="small" />
                        <TextField value = {data.price} onChange={e=>setData({...data, price: parseInt(e.target.value)})} type="number" label = "Price" className="form-input" size="small" />
                        <TextareaAutosize value={data.description} onChange={e=>setData({...data, description: e.target.value})} className="form-text-area" placeholder="Describe food..." maxRows={10} minRows = {5} />
                        <Select value = {data.food_category_id} onChange={e=>setData({...data, food_category_id: e.target.value})} placeholder="Category" className="form-input" size="small" defaultValue={"cat"}>
                            <MenuItem value = "cat">Categories</MenuItem>
                            {
                                categories.map((x, i)=><MenuItem value={x.food_category_id} key = {i}>{x.name}</MenuItem>)
                            }
                        </Select>
                        <div className = "delete-container">
                            <div className = "delete-title">Delete Food?</div>
                            <div className = "delete-button" onClick={onDelete}>DELETE</div>
                        </div>
                        <TwoWayButton isDisabled = {editing} onCancel = {()=>navigate(-1)}>
                            {editing?"Editing...":"Edit"}
                        </TwoWayButton>
                    </ElevatedContainer>
                </form>
            </Main>
        </>
    )
}