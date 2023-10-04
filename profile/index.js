const app = require('express')()

app.get((req,res)=>{
    console.log('helo');
    res.send('hi')
})

app.listen(3001,()=>{
    console.log("profile listening on port 3001");
})