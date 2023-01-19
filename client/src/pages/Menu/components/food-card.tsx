import ElevatedContainer from "components/Container/Elevated";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import "./food-card.scss";
import { NavLink } from "react-router-dom";
import { Food } from "@shared/Menu";

export function FoodCard({data}: {data: Food}){
    return(
        <NavLink to = {"/menu/food/"+data.food_id}>
            <ElevatedContainer className="food-card">
                <div className = "food-image">
                    <img src = {data.image_url} className = "full-img" />
                </div>
                <div className="food-name ellipsis">{data.name}</div>
                <div className = "food-info">
                    <div className = "price">
                        <div className = "text-secondary-alt" style={{marginBottom: ".5rem"}}>Price</div>
                        <div className = "text-primary">Rs {data.price}</div>
                    </div>
                    <div className = "category">
                        <div className = "text-secondary-alt" style={{marginBottom: ".5rem"}}>Category</div>
                        <div className = "text-primary ellipsis" style={{width: "105px",}}>
                            {data.category_name}
                        </div>

                    </div>
                </div>
            </ElevatedContainer>
        </NavLink>
        
    )
}

export function AddFoodCard(){
    return(
        <NavLink to = "create">
            <ElevatedContainer className="food-card add-food-card center">
                <div className = "dotted-circle center">
                    <AddRoundedIcon />
                </div>
            </ElevatedContainer>    
        </NavLink>
    )
}