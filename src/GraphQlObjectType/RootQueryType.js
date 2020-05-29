const { GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList
} = require('graphql');

const course = require('../data/course.json');
const student = require('../data/student.json');
const grade = require('../data/grade.json');

const courseType = require('./course');
const studentType = require('./students');
const gradeType = require('./grade');

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'RootQuery',
    fields: () => ({
        course: {
            type: new GraphQLList(courseType),
            description: 'List of all courses',
            resolve: () => course
        },
        student: {
            type: new GraphQLList(studentType),
            description: 'List of all students',
            resolve: () => student
        },
        grade: {
            type: new GraphQLList(gradeType),
            description: 'List of all grade',
            resolve: () => grade
        }
    })
});

module.exports = RootQueryType;