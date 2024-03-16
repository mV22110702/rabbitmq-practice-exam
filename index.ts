import {connect} from  'amqplib'

const QUEUE_NAME = 'exam'
const EXCHANGE_NAME='exchange.b38c000e-1f86-41f8-9d9e-0a0ffd03b61f'
const ROUTING_KEY='b38c000e-1f86-41f8-9d9e-0a0ffd03b61f'
const CONN_STRING = 'amqps://student:XYR4yqc.cxh4zug6vje@rabbitmq-exam.rmq3.cloudamqp.com/mxifnklj'

const connection = await connect(CONN_STRING);
const channel = await connection.createChannel();
await channel.assertQueue(QUEUE_NAME, {
    durable: true
});
await channel.assertExchange(EXCHANGE_NAME, 'direct', {
    durable: false
});
await channel.bindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY);

const payload = 'Hi CloudAMQP, this was fun!'
const res = channel.publish(EXCHANGE_NAME, ROUTING_KEY, Buffer.from(payload), {persistent:true});
console.log('Message sent to queue',res);

await channel.unbindQueue(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY);
await channel.deleteExchange(EXCHANGE_NAME);
await channel.close();
await connection.close();
