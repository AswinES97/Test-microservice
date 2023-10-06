const app = require('express')()
const getConsumer = require('./subscriber/index-subscriber')
const getProducer = require('./producer/index-proudcer')

getConsumer().then(async (consumer) => {
    let msg = null
    await consumer.run({
        eachMessage: async (payload) => {
            const { message } = payload
            console.log(message.value.toString());
            msg = message
        }
    })

    const producer = await getProducer()
    if (!msg) {
        return await producer.send({
            topic: "profile-response",
            messages: [{ value: Buffer.from("false")}]
        })
    }

    await producer.send({
        topic: 'profile-response',
        messages: [{  value: Buffer.from("true") }]
    })

})

app.get((req, res) => {
    console.log('helo');
    res.send('hi')
})

app.listen(3001, () => {
    console.log("profile listening on port 3001");
})