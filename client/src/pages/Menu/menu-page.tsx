import { getFoods } from "api/menu";
import { Main } from "components/Container/Main";
import Header from "components/Header/header";
import { toastError } from "components/Toast/toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AddFoodCard, FoodCard } from "./components/food-card";
import MenuCategory from "./components/menu-category";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import "./menu.scss";
import { RootState } from "redux/store";
import { addFoodArray } from "redux/foodReducer";
export function MenuPage(){
    const foods = useSelector((state: RootState) => state.foods);
    const [search, setSearch] = useState("")
    const id = useParams().id || "";
    const dispatch = useDispatch();
    useEffect(()=>{
        getFoods({category: id, search})
        .then(res=>{
            if(res.error) toastError("Error while fetching food item.");
            dispatch(addFoodArray(res.data))
        })
    }, [id, search])
    return(
        <>
            <Header title="Food and Menu" sub_title="Edit your food items of your restaurant" />
            <Main style={{backgroundColor: "var(--foreground)", flexDirection: "column"}}>
                <MenuCategory />
                <MenuTitle onSearch={setSearch} />
                <div className = "food-cards-container">
                    <AddFoodCard />
                    {foods.map((x, i)=><FoodCard data = {x} key = {i} />)}
                </div>
            </Main> 
        </>
    )
}

function MenuTitle({onSearch}: {onSearch: (name: string)=>void}){
    return(
        <div className = "menu-search-title">
            <div style = {{
                padding: "2rem 0",
                color: "var(--text-primary)",
                fontSize: "1.1rem"
            }}>All Foods</div>
            <div className = "search-container">
                <div className = "search-icon center">
                    <SearchRoundedIcon />
                </div>
                <input placeholder="Search" className = "search-input" onChange={e=>onSearch(e.target.value)} />
            </div>
        </div>
        
    )
}

