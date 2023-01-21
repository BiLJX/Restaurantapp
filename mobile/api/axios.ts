import AsyncStorage from "@react-native-async-storage/async-storage"
import ax from "axios"

export const CONNECTION_URI = "http://192.168.1.64:5000"

const axios = ax.create({
    baseURL: CONNECTION_URI,
    withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
})

axios.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('session')
        if (token) {
        config.headers.Authorization = token
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

export default axios
