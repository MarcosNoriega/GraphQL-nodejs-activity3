const { GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList
} = require('graphql');

const courses = require('../data/course.json');
const students = require('../data/student.json');
const grades = require('../data/grade.json');

const courseType = require('./course');
const studentType = require('./students');
const gradeType = require('./grade');

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'RootQuery',
    fields: () => ({
        courses: {
            type: new GraphQLList(courseType),
            description: 'List of all courses',
            resolve: () => courses
        },
        students: {
            type: new GraphQLList(studentType),
            description: 'List of all students',
            resolve: () => students
        },
        grades: {
            type: new GraphQLList(gradeType),
            description: 'List of all grade',
            resolve: () => grades
        },
        course: {
            type: courseType,
            description: 'Get a course',
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (params, args) => {
                return courses.find(course => course.id === args.id)
            } 
        },
        student: {
            type: studentType,
            description: 'get a student',
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (params, args) => {
                return students.find(student => student.id === args.id)
            }
        },
        grade: {
            type: gradeType,
            description: 'get a grade',
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (params, args) => {
                return grades.find(grade => grade.id === args.id)
            }
        }
    })
});

module.exports = RootQueryType;