const express = require('express')
const app = express()
const getProducer = require('./producer/index-proudcer')
const getConsumer = require('./subscriber/index-subscriber')

app.use(express.json())

let producer
let consumer

async function intilize() {
    producer = await getProducer()
    consumer = await getConsumer()
}

intilize()
app.post('/', async (req, res) => {
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
                result = message.value.toString()
                console.log(message.value.toString());
                if (result === "true")
                    return res.send('user created')

                res.status(400).send('bad request')
            },

        })
    } catch (error) {
        console.log("error :", error);
    }

})

app.listen(3000, () => {
    console.log("auth listening on port 3000")
})