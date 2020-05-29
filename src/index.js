const express = require('express');
const app = express();
const express_graphql = require('express-graphql');
const { GraphQLSchema } = require('graphql');

const RootQueryType = require('./GraphQlObjectType/RootQueryType');

const schema = new GraphQLSchema({
    query: RootQueryType,
});

app.use('/graphql', express_graphql({
    graphiql: true,
    schema
}));

app.listen(3000, () => console.log('app on port', 3000));