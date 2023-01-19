import Toast from 'react-native-toast-message';
export const toastSuccess = (message: string) => {
    Toast.show({
        type: "success",
        text1: "Success",
        text2: message,
        
    });
}

export const toastError = (m: string) => {
    Toast.show({
        type: "error",
        text1: "Error",
        text2: m
    });
}