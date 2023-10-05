const express = require('express')
const app = express()
const getProducer = require('./producer/index-proudcer')

app.use(express.json())

app.post('/', async (req, res) => {
    const { name } = req.body
    const producer = await getProducer()

    await producer.send({
        topic: "username",
        messages: [{ value: Buffer.from(name) }]
    })

    
    res.send('auth')
})

app.listen(3000, () => {
    console.log("auth listening on port 3000")
})