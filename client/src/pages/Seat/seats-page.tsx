import { Main } from "components/Container/Main";
import Header from "components/Header/header";
import SeatList from "./seat-lists";

export default function SeatsPage(){
    return(
        <>
            <Header title="Seats" sub_title="Manage seats of your restaurant" />
            <Main className="center">
                <SeatList />
            </Main>
        </>
    )
}