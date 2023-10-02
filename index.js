const http = require('http')

const server = http.createServer((req,res)=>{
    console.log("server running");
})

server.listen(3000,()=>{
    console.log("server listing on port 3000");
})