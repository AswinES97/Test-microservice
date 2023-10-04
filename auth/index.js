const app = require('express')()

app.get((req,res)=>{
    // res.send('auth')
})

app.listen(3000,()=>{
    console.log("auth listening on port 3000")
})