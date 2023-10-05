// const { Kafka } = require('kafkajs')

// const kafka = new Kafka({ clientId: "my-app", brokers: ["localhost:29092"], })


// // create a new consumer from the kafka client, and set its group ID
// // the group ID helps Kafka keep track of the messages that this client
// // is yet to receive
// const consumer = kafka.consumer({ groupId: "my-app" })

// const consume = async () => {
//     // first, we wait for the client to connect and subscribe to the given topic
//     await consumer.connect()
//     await consumer.subscribe({ topic: "message-log", fromBeginning: false })
//     await consumer.run({
//         // this function is called every time the consumer gets a new message
//         eachMessage: ({ message }) => {
//             // here, we just log the message to the standard output
//             console.log(`received message: ${message.value}`)
//         },
//     })
// }

// consume()

const { Kafka } = require('kafkajs')


module.exports = getConsumer = async () => {
    const kafka = new Kafka({
        clientId: 'consumer-client',
        brokers: ['localhost:29092'],
    });

    const consumer = kafka.consumer({ groupId: 'my-group' });

    const subscription = {
        topic: "test",
        fromBeginning: true,
    };

    await consumer.connect();
    await consumer.subscribe(subscription);

    return consumer;
};


