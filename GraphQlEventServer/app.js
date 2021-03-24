const express = require('express')
const bodyparser = require('body-parser')
const { graphqlHTTP } = require('express-graphql');
const buildSchema = require('./graphql/schema/index')
const resolvers = require('./graphql/resolvers/index')
const Booking=require('./models/booking')
const cors=require('cors')
const mongoose = require('mongoose');
const auth = require('./middleware/auth');

mongoose.connect('mongodb+srv://amit_shinde:amit_shinde@cluster0-bzohy.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
    });
const app = express()
app.use(cors())
app.use(bodyparser.json());
app.get('/', (req, res, next) => {
    console.log('req', req)
    res.send('Hello')
});
// Event.remove({}).exec().then(res=>{
//     console.log('res-------', res)

// })
// Booking.remove({}).exec().then(res=>{
//     console.log('res-------', res)

// })
let ev = [];
app.use(auth)
app.use('/graphql',
    graphqlHTTP({
        schema: buildSchema,
        rootValue: resolvers,
        graphiql: true
    }))

app.listen(3000, () => {
    console.log('listneing')
})