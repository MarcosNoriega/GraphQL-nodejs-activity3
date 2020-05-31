const {GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');

const courses = require('../data/course.json');
const students = require('../data/student.json');
const grades = require('../data/grade.json');

const courseType = require('./course');
const studentType = require('./students');
const gradeType = require('./grade');

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'RootMutation',
    fields: {
        addCourse: {
            type: courseType,
            description: 'add a book',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve: (params, args) => {
                const course = {
                    id: courses.length + 1,
                    name: args.name,
                    description: args.description
                };

                courses.push(course);

                return course;
            }
            
        },
        addStudent: {
            type: studentType,
            description: 'add a student',
            args: {
                name: {type: GraphQLString},
                lastname: {type: GraphQLNonNull(GraphQLString)},
                courseId: {type: GraphQLNonNull(GraphQLInt)}
            },
            resolve: (params, args) => {
                const student = {
                    id: students.length + 1,
                    name: args.name,
                    lastname: args.lastname,
                    courseId: args.courseId
                };

                students.push(student);

                return student;
            }
        },
        addGrade: {
            type: gradeType,
            description: 'add a grade',
            args: {
                courseId: {type: GraphQLNonNull(GraphQLInt)},
                studentId: {type: GraphQLNonNull(GraphQLInt)},
                grade: {type: GraphQLNonNull(GraphQLInt)}
            },
            resolve: (params, args) => {
                const grade = {
                    id: grades.length + 1,
                    courseId: args.courseId,
                    studentId: args.studentId,
                    grade: args.grade
                };

                grades.push(grade);

                return grade;
            }
        }
    }
});

module.exports = RootMutationType;