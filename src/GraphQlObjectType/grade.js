const { GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');

const courses = require('../data/course.json');
const students = require('../data/student.json');

const courseType = require('./course');
const studentType = require('./students');

const gradeType = new GraphQLObjectType({
    name: 'Grade',
    description: 'Represent grade',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        courseId: {type: GraphQLNonNull(GraphQLInt)},
        studentId: {type: GraphQLNonNull(GraphQLInt)},
        grade: {type: GraphQLNonNull(GraphQLInt)},
        course: {
            type: courseType,
            resolve: (grade) => {
                return courses.find(course => course.id === grade.courseId);
            }
        },
        student: {
            type: studentType,
            resolve: (grade) => {
                return students.find(student => student.id === grade.studentId);
            }
        }
    })
});

module.exports = gradeType;