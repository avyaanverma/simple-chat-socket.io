var express = require('express')
const app = express()
const server = require('http').createServer(app)
const path = require('path')

const io = require('socket.io')(server, { cors: {origin : "*"}})

app.use('/private/private' , express.static('public'))

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname , './public/index.html'))
})

server.listen(3000, ()=>{
    console.log("Server running on port 3000");
})

io.on('connection', (socket)=>{
    console.log("User Connected " + socket.id);

    socket.on('message' , (mssge)=>{
        console.log(mssge);
    })
})