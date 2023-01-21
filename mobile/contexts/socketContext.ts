import AsyncStorage from "@react-native-async-storage/async-storage";
import { CONNECTION_URI } from "api/axios";
import { createContext } from "react";
import io from "socket.io-client";
import { Socket } from "socket.io-client";

export async function createSocket(){
    const session = await AsyncStorage.getItem("session");
    return io(CONNECTION_URI, {
        query: {
            token: session
        }
    })
}
export const SocketContext = createContext<Socket>(null as any);
