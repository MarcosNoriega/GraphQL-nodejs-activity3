const { GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');

const studentType = new GraphQLObjectType({
    name: 'Student',
    description: 'Represent student',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLNonNull(GraphQLString)},
        lastname: {type: GraphQLNonNull(GraphQLString)},
        courseId: {type: GraphQLNonNull(GraphQLInt)}
    })
});

module.exports = studentType;