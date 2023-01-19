import { NavLink } from "react-router-dom";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import "./nav-bar.scss";
export default function NavBar(){
    return(
        <nav id = "main-nav">
            <header>
                <h1>Resta<span>urant</span></h1>
            </header>
            <div className = "nav-items-container">
                <NavItem to = "/" label = "Dashboard" icon={<DashboardOutlinedIcon />} />
                <NavItem to = "/menu" label = "Food and Menu" icon={<RestaurantMenuRoundedIcon />} />
                <NavItem to = "/employees" label = "Employees" icon={<BadgeOutlinedIcon />} />
                <NavItem to = "/seats" label = "Seats" icon={<ChairOutlinedIcon />} />
            </div>
        </nav>
    )
}

interface Props {
    label: string;
    icon: JSX.Element;
    to: string;
}
function NavItem({
    label,
    icon,
    to
}: Props){
    return(
        <NavLink to = {to} className = "nav-item">
            <div className = "icon center">{icon}</div>
            <div className="label center">{label}</div>
        </NavLink>
    )
}