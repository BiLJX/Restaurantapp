import AppNav from "./navigation/AppNav";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App(){
    return(
        <Provider store={store}>
            <AppNav />
        </Provider>
    )
}