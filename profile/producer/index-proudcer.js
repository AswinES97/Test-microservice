// const { Kafka, logLevel } = require('kafkajs')

// // import the `Kafka` instance from the kafkajs library

// // the client ID lets kafka know who's producing the messages
// const clientId = "my-app"
// // we can define the list of brokers in the cluster
// const brokers = ["localhost:29092"]
// // this is the topic to which we want to write messages
// const topic = "message-log"

// // initialize a new kafka client and initialize a producer from it
// const kafka = new Kafka({ clientId, brokers, })
// const producer = kafka.producer()

// // we define an async function that writes a new message each second
// const produce = async () => {
//     await producer.connect()
//     let i = 0

//     // after the produce has connected, we start an interval timer
//     setInterval(async () => {
//         try {


//             // Introduce an initial delay
//             // await new Promise(resolve => setTimeout(resolve, 5000));

//             // send a message to the configured topic with
//             // the key and value formed from the current value of `i`
//             await producer.send({
//                 topic,
//                 acks: 1,
//                 messages: [
//                     {
//                         key: String(i),
//                         value: "this is message " + i,
//                     },
//                 ],
//             })

//             // if the message is written successfully, log it and increment `i`
//             console.log("writes: ", i)
//             i++
//         } catch (err) {
//             console.error("could not write message " + err)
//         }
//     }, 2000)
// }

// produce()

// // the kafka instance and configuration variables are the same as before


const { Kafka } = require('kafkajs')

module.exports = getProducer = async () => {
  const kafka = new Kafka({
    clientId: 'producer-client',
    brokers: ['localhost:29092'],
  });

  const producer = kafka.producer();
  await producer.connect();

  return producer;
};




