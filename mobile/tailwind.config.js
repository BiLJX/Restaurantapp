module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}", 
        "./screens/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./navigation/**/*.{js,jsx,ts,tsx}",
    ],
        theme: {
        extend: {},
        colors: {
            "white": {
                100: "#FFFFFF",
                200: "#FAFAFA",
                300: "#E9E9E9",
                400: "#c2c2c2"
            },
            "gray": {
                100: "#c2c2c2",
                200: "#8A8A8A",
                300: "#919191",
                400: "#404040",
                500: "#465362",
                700: "#0E1216"
            },
            "brc": {
                100: "#DCDCDC",
                200: "#8A8A8A"
            }
        }
    },
    plugins: [],
}