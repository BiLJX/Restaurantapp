import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { NavLink } from 'react-router-dom';
import "./header.scss"
interface HeaderProps {
    title: string,
    sub_title: string,
    border?: boolean
}
export default function Header({
    title,
    sub_title,
    border = true
}:HeaderProps){
    return(
        <header className="header" style={border?{borderBottom: "1px solid var(--border-color)"}:undefined}>
            <div className = "header-labels">
                <h1>{title}</h1>
                <span>{sub_title}</span>
            </div>
            <div className = "header-button-container">
                <NavLink to = "/settings" className = "header-button">
                    <SettingsOutlinedIcon />
                </NavLink>
            </div>
        </header>
    )
}