# Simple-Chat Application Guide

In this repository I am goin to tell you how you can use socket.io alongisde nodejs to create a very simple chat application. 
It wasn't pretty easy to build especially if you don't know the basics of nodejs but don't worry that is the learning curve. 

_This project doesn't belong to me I just watched a youtube video but felt the urge to document everthing up_

# Project Setup


Simply init the npm repo and install the socket.io and nodemon module
```bash
npm init
npm i -g nodemon
npm i socket.io 
```

# Start with the backend server file 

```javascript
var express = require('express')
const app = express()
// const server = require('http').createServer(app)
const path = require('path')

// app.use('/' , express.static('public'))

app.get('/', (req,res)=>{
    // res.sendFile('D:\\Code\\Chat-App\\public\\index.html');
    res.sendFile(path.join(__dirname , './public/index.html'))
})

app.listen(3000, ()=>{
    console.log("Server running on port 3000");
})


io.on('connection', (socket)=>{

    console.log("User Connected " + socket.id);
})
```


This is the starting template for the express server that can built
Try to refer to the docs side by side if are unsure of the concepts: https://expressjs.com/en/starter/installing.html


# Let's get started with socket.io 

This is the html starting file where I have created an input box and a send button only to simplify the learning. 
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://cdn.socket.io/4.7.5/socket.io.esm.min.js"></script>
    <title>Chat App</title>
</head>
<body>
    <div id="message-container">
        <h1>Enter your text! </h1>
        <input type="text" name="message">
        <button>Send Message</button>
    </div>

    
</body>
<script >
    const socket = io('http://localhost:3000');
    socket.on('connection');
</script>
</html>
```


## Start the server with nodemon and resolving some errors
After this point you might have ended with the same error as me 

```bash
nodemon index.js
```
![Error](/assets/error.png)



If you have done these errors which I am sure you have if you followed me, number one thing we have to change the index.html file in the public folder 
I read the docs in the client socket.io: https://socket.io/docs/v4/client-installation/#from-a-cdn 
just remove the first script where we try get the cdn


```html
<script  type="module">
    import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
    const socket = io('http://localhost:3000');
    socket.on('connection');
</script>


```



# Let's try sending a message 

```html
    <div id="message-container">
        <h1>Enter your text!</h1>
        <input type="text" name="message">
        <button onclick="sendMessage()" >Send Message</button>
    </div>
```


Right now at this point I can just give you the correct code but I really want that the mistake that I did is not something that you guys do as well. 

```html
    <script type="module">
        import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
        const socket = io('http://localhost:3000'); //connection string to backend

        socket.on('connection')
        function sendMessage(){
            socket.emit('message' , 'test message')
        }
    </script>

```



This will be giving you the error sendMessage not defined this is because when using type = "module" functions aren't added to global scope in javascript to solve this we can add the function manually to the window object

By doing this ....

```html
   <script type="module">
        import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
        const socket = io('http://localhost:3000'); //connection string to backend

        socket.on('connection')
        window.sendMessage = function(){
            socket.emit('message' , 'test message')
        }
    </script>

```


Either this can be done or if there is a custom a solution given in the docs is this : 
Just remember to remove the manual onclick function in the button tag. Also don't forget to add the id's in the tag. 


```html 
<script  type="module">
    import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
    const socket = io('http://localhost:3000');
    
    
    const button = document.getElementById('but')
    const input = document.getElementById('input')
    
    socket.on('connection');

    button.addEventListener('click' , (e)=>{
        e.preventDefault();
        if(input.value){
            socket.emit('message', input.value);
            input.value = ''
        }
    })
</script>

```


I would recommend you to try and test out every possibility when trying out. It can be irritating in the starting and it was for me as well but this is the only to get used to reading the docs 

https://socket.io/docs/v4/client-api/


A descriptive guide is given here as well, you can check it out which can be helpful for studying, the only way is to type and test out every code from your side to fully understand the docs. 
