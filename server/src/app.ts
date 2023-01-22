//apps
import express from "express"
import mongoose from "mongoose"
import { Server } from "socket.io"
import path from "path"
import jwt from "jsonwebtoken"
import "./fire";
//middlewares
import bodyParser from "body-parser"
import cors from "cors"
import cookieParser from "cookie-parser"
import { ApiRoutes } from "./routes"
import { EMPLOYEE_SECRET } from "./secret"
import { Employees } from "./models/Employee"
import orderHandler from "./handler/orderHandler"


//constants
const CONNECTION_URL = "mongodb+srv://BiLJX:42a3RePvN1DGXkDh@cluster0.vyegx.mongodb.net/RMS?retryWrites=true&w=majority"
//const CONNECTION_URL = "mongodb+srv://cluster0.vyegx.mongodb.net/myFirstDatabase"
const PORT = process.env.PORT || 5000


//app
const app = express()

//using middlewares
app.use(bodyParser.json())
app.use(cors({credentials: true, origin: true}));
app.use(cookieParser())
app.use(express.static(path.join("build")))

//api
app.use("/api", ApiRoutes)

// app.get("/*", (req, res)=>{
//     res.sendFile(path.join(__dirname,"..", "build", "index.html"));
// })
//init app

async function _INIT_(){
    const server = app.listen(PORT, ()=>{
        console.log("listening on port "+PORT+"...")
    });
    const io = new Server(server);
    io.use(async(socket, next)=>{
        try {
            const token = <string>socket.handshake.query.token;
            if(!token) return next(new Error("Not Authorized"));
            const {user_id}: any = jwt.verify(token, EMPLOYEE_SECRET);
            const user = await Employees.findOne({user_id});
            if(!user) return next(new Error("Not Authorized"));
            socket.user_id = user.user_id;
            socket.restaurant_id = user.restaurant_id;
            socket.role = user.role as any;
            return next()
        } catch (error) {
            console.log(error)
            return;
        }
    }).on("connection", (socket)=>{
        socket.join([`${socket.restaurant_id}:${socket.role}` ,socket.user_id, socket.restaurant_id]);
        orderHandler(socket, io)
    })
}
mongoose.connect(CONNECTION_URL).then(_INIT_)