var express = require('express');
var { graphqlHTTP} = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query {
        hello: String,
        rollDice(numDice: Int!, numSides: Int): [Int],
        rollThreeDice: [Int]
    }
`);

var root = {
    hello: () => {
        return 'Hello World'
    },
    rollDice: ({numDice, numSides = 6}) => {
        return [...Array(numDice).keys()].map(_ => 1 + Math.floor(Math.random() * numSides));
    },
    rollThreeDice: () => {
        return Array.from().map(_ => 1 + Math.floor(Math.random() * 6));
    },
}

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000);
console.log('%c### Listening to port 4000', 'background: orange; color: black');
