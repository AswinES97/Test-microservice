const express = require('express')
const app = express()
const getProducer = require('./producer/index-proudcer')
const getConsumer = require('./subscriber/index-subscriber')

app.use(express.json())

app.post('/', async (req, res) => {
    let result = null
    const { name } = req.body
    const producer = await getProducer()
    const consumer = await getConsumer()

    await producer.send({
        topic: "username",
        messages: [{ value: Buffer.from(name) }]
    })

    await consumer.run({
        //   eachBatchAutoResolve: false,
        eachMessage: async (messagePayload) => {
            const { topic, partition, message } = messagePayload;
            result = message.value.toString()
            console.log(message.value.toString());
        },
    });
    
    if (result === "true")
        return res.send('user created')

    res.status(400).send('bad request')
})

app.listen(3000, () => {
    console.log("auth listening on port 3000")
})