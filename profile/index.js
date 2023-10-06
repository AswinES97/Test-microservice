const app = require('express')()
const getConsumer = require('./subscriber/index-subscriber')
const getProducer = require('./producer/index-proudcer')

getConsumer().then(async (consumer) => {
    let msg = null
    const producer = await getProducer()
    await consumer.run({
        eachMessage: async (payload) => {
            const { message } = payload
            console.log("msg from conume: ",message.value.toString());
            msg = message.value.toString()

            if (msg !== 'aswin') {
                return await producer.send({
                    topic: "profile-response",
                    messages: [{ value: Buffer.from("false")}]
                })
            }
        
            await producer.send({
                topic: 'profile-response',
                messages: [{  value: Buffer.from("true") }]
            })
        }
    })


})

app.get((req, res) => {
    console.log('helo');
    res.send('hi')
})

app.listen(3001, () => {
    console.log("profile listening on port 3001");
})