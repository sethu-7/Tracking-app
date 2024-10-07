const express=require("express");
const app=express()
const http=require('http')
const socketio=require('socket.io')
const path=require("path");
const { emit } = require("process");

const server=http.createServer(app)
const io=socketio(server)

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))

// console.log("co")
io.on("connection",function(socket){
    socket.on("send-location",function(data){
        io.emit("recieve-location",{id:socket.id,...data})
    })
    socket.on("disconnect",()=>{
        io.emit("user-disconnect",socket.id)
    })
    console.log("connected")
})

app.get("/",(req,res)=>{
    res.render("index")
})

server.listen(8000)
console.log("running at port 8000")