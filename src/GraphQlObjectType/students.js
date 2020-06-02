const { GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');

const courses = require('../data/course.json');
const courseType = require('./course');

const studentType = new GraphQLObjectType({
    name: 'Student',
    description: 'Represent student',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLNonNull(GraphQLString)},
        lastname: {type: GraphQLNonNull(GraphQLString)},
        courseId: {type: GraphQLNonNull(GraphQLInt)},
        course: {
            type: courseType,
            resolve: (student) => {
                return courses.find(course => course.id === student.courseId);
            }
        }
    })
});

module.exports = studentType;