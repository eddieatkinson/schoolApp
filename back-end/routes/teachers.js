var express = require('express');
var router = express.Router();
var config = require('../config/config.js');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var connection = mysql.createConnection(config);
connection.connect();

router.get('/courses/:teacherId/get', (req, res)=>{
	const teacherId = req.params.teacherId;
	// console.log("TEACHER ID:")
	// console.log(teacherId);
	var coursesQuery = `SELECT * FROM courses
		INNER JOIN teachers ON courses.teacherId = teachers.teacherId
		WHERE courses.teacherId = ?;`;
	connection.query(coursesQuery, [teacherId], (error, results)=>{
		if(error){
			throw error;
		}else{
			// console.log("============");
			// console.log(results);
			// console.log("============");
			res.json(results);
		}
	});
});

router.get('/courseInfo/:courseId/get', (req, res)=>{
	const courseId = req.params.courseId;
	// console.log("TEACHER ID:")
	// console.log(teacherId);
	var coursesQuery = `SELECT * FROM courses
		INNER JOIN teachers ON courses.teacherId = teachers.teacherId
		WHERE courses.id = ?;`;
	connection.query(coursesQuery, [courseId], (error, results)=>{
		if(error){
			throw error;
		}else{
			console.log("============");
			console.log(results);
			console.log("============");
			res.json(results);
		}
	});
});

router.get('/assignments/:courseId/get', (req, res)=>{
	const courseId = req.params.courseId;
	// console.log("TEACHER ID:")
	// console.log(teacherId);
	var assQuery = `SELECT * FROM assignments
		WHERE cid = ?;`;
	connection.query(assQuery, [courseId], (error, results)=>{
		if(error){
			throw error;
		}else{
			console.log("============");
			console.log(results);
			console.log("============");
			res.json(results);
		}
	});
});

router.get('/students/:teacherId/get', (req, res)=>{
	const teacherId = req.params.teacherId;
	// console.log("TEACHER ID:")
	console.log(teacherId);
	var studentsQuery = `SELECT * FROM students
		WHERE teacherId = ?;`;
	connection.query(studentsQuery, [teacherId], (error, results)=>{
		if(error){
			throw error;
		}else{
			console.log("============");
			console.log(results);
			console.log("============");
			res.json(results);
		}
	});
});

router.get('/studentInfo/:studentId/get', (req, res)=>{
	const studentId = req.params.studentId;
	// console.log("student ID:")
	console.log(studentId);
	var studentParentQuery = `SELECT parents.firstName AS parentFirstName,
	parents.lastName AS parentLastName, parents.email as parentEmail,
	parents.phone as parentPhone, students.firstName, students.lastName, students.phone, students.email FROM parents
		INNER JOIN studentParent ON parents.parentId = studentParent.parentId
		INNER JOIN students ON studentParent.studentId = students.studentId
		WHERE studentParent.studentId = ?;`;
	connection.query(studentParentQuery, [studentId], (error, results)=>{
		if(error){
			throw error;
		}else{
			console.log("============");
			console.log(results);
			console.log("============");
			res.json(results);
		}
	});
});

router.post('/addAssignments', (req, res)=>{
	const courseId = parseInt(req.body.courseId);
	const assignmentName = req.body.assignmentName;
	const assignmentDesc = req.body.assignmentDesc;

	const insertAssignmentQuery = `INSERT INTO assignments (cid, assName, assDesc)
		VALUES
		(?, ?, ?);`;
	connection.query(insertAssignmentQuery, [courseId, assignmentName, assignmentDesc], (error, results)=>{
		if(error){
			throw error;
		}else{
			res.json({
				msg: "assingmentsInserted"
			});
		}
	});
});

router.get('/grades/:courseId/get', (req, res)=>{
	const courseId = req.params.courseId;
	// console.log("student ID:")
	console.log(courseId);
	var gradesQuery = `SELECT * FROM students
		INNER JOIN assignmentStatus ON students.studentId = assignmentStatus.sid
		INNER JOIN assignments ON assignmentStatus.aid = assignments.id
		WHERE assignmentStatus.cid = ?;`;
	connection.query(gradesQuery, [courseId], (error, results)=>{
		if(error){
			throw error;
		}else{
			console.log("============");
			console.log(results);
			console.log("============");
			res.json(results);
		}
	});
});
// /* GET users listing. */
// router.get('/', function(req, res, next) {
 
// });

module.exports = router;
