import { NavLink } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import "./menu-category.scss";
import CategoryListModal from "./category-lists";
import React, { useEffect, useRef, useState } from "react";
import { FoodCategory } from "@shared/Menu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "types";
import { getFoodCategories } from "api/menu";
import { toastError } from "components/Toast/toast";
import { addFoodCategoriesArray } from "redux/FoodCategory/categoryActions";

export default function MenuCategory(){
    const [categoryList, setCategorylist] = useState(false);
    const foodCategories = useSelector((state: RootState)=>state.food_categories);
    const ref = useRef<any>(null);
    const scrollRef = useRef<any>(null);
    const scrollRef2 = useRef<any>(null);
    const dispatch = useDispatch();
    const scroll = (e: any) => {
        e.preventDefault();
        const container = ref.current;
        if(!container) return;
        if (e.deltaY > 0) container.scrollLeft += 85;
        else container.scrollLeft -= 85;
    }
    useEffect(()=>{
        getFoodCategories()
        .then(res=>{
            if(res.error) return toastError(res.message);
            dispatch(addFoodCategoriesArray(res.data));
        })
        
    }, [])
    useEffect(()=>{
        if(!scrollRef.current || !scrollRef2.current) return;
        const func1 = scrollRef.current.addEventListener("wheel", scroll, {passive: false})
        const func2 = scrollRef2.current.addEventListener("wheel", scroll, {passive: false})
        const func3 =ref.current.addEventListener("wheel", scroll, {passive: false})
        return(()=>{
            window.removeEventListener("wheel", func2);
            window.removeEventListener("wheel", func1);
            window.removeEventListener("wheel", func3);
        })
    }, [scrollRef.current])
    return(
        <div className = "menu-category-container" ref = {ref}>
           {categoryList && <CategoryListModal onClose = {()=>setCategorylist(false)} />}
            <EditCategory onClick = {()=>setCategorylist(true)} />

            <Category ref={scrollRef2} data = {({name: "All", food_category_id: ""}) as any}  />
            {foodCategories.map((x, i)=><Category data = {x} key = {i} ref = {scrollRef} />)}
            
        </div>
    )
}

function EditCategory({onClick}: {onClick: ()=>void}){
    return(
        <button className = "category-item" onClick = {onClick}>
            <EditIcon />
        </button>
    )
}




const Category = React.forwardRef(({data}: {data: FoodCategory}, ref: any)=>(
        <NavLink to = {"/menu/"+data.food_category_id} className = "category-item" ref={ref}>
            <span>{data.name}</span>
        </NavLink>
    ))

