const { GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');


const courseType = new GraphQLObjectType({
    name: 'Course',
    description: 'Represent course',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: {type: GraphQLNonNull(GraphQLString)}
    })
});

module.exports = courseType;