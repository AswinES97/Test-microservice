const express = require('express')
const app = express()
const getProducer = require('./producer/index-proudcer')
const getConsumer = require('./subscriber/index-subscriber')

app.use(express.json())



app.post('/', async (req, res) => {
    const producer = await getProducer()
    const consumer = await getConsumer()
    let result = null
    const { name } = req.body

    try {

        await producer.send({
            topic: "username",
            messages: [{ value: Buffer.from(name) }]
        })

        await consumer.run({
            //   eachBatchAutoResolve: false,
            eachMessage: async (messagePayload) => {
                const { topic, partition, message } = messagePayload;
                console.log("msg from consume auth:", message);
                result = message.value.toString()
                console.log(message.value.toString());
            },

        })
    } catch (error) {
        console.log("error :", error);
    }
    console.log("result", result);
    if (result === "true")
        return res.send('user created')

    res.status(400).send('bad request')
})

app.listen(3000, () => {
    console.log("auth listening on port 3000")
})