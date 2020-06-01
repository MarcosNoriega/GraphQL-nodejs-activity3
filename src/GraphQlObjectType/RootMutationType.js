const {GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLError
} = require('graphql');
const _ = require('lodash');

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
        },
        deleteGrade: {
            type: gradeType,
            description: 'delete a grade',
            args: {
                id: {type: GraphQLNonNull(GraphQLInt)}
            },
            resolve: (params, args) => {
                let grade = _.remove(grades, grade => {
                    return grade.id === args.id;
                });

                return grade[0];
            }
        },
        deleteStudent: {
            type: studentType,
            description: 'delete a curse',
            args: {
                id: {type: GraphQLNonNull(GraphQLInt)}
            },
            resolve: (params, args) => {
                let grade = grades.find(grade => grade.studentId === args.id);

                if (grade) return new GraphQLError("no se puede");

                let student = _.remove(students, student => {
                    return student.id === args.id;
                });

                return student[0];
            }
        },
        deleteCurse: {
            type: courseType,
            description: 'delete a course',
            args: {
                id: {type: GraphQLNonNull(GraphQLInt)}
            },
            resolve: (params, args) => {
                let student = students.find(student => student.courseId === args.id);
                let grade = grades.find(grade => grade.courseId === args.id);

                if (grade || params) return new GraphQLError("no se puede");

                let course = _.remove(courses, course => {
                    return course.id === args.id;
                });

                return course[0];
            }
        }
    }
});

module.exports = RootMutationType;