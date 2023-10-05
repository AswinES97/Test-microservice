const app = require('express')()
const getConsumer = require('./subscriber/index-subscriber')

getConsumer().then((consumer) => {
    consumer.run({
        eachMessage: async (payload) => {
            const { message } = payload
            console.log(message.value.toString());
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