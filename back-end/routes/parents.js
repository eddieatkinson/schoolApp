var express = require('express');
var router = express.Router();
var config = require('../config/config.js');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var connection = mysql.createConnection(config);
connection.connect();

router.get('/countNewMessages/:parentId/get', (req, res)=>{
	const parentId = req.params.parentId;
	// console.log("TEACHER ID:")
	// console.log(teacherId);
	var coursesQuery = `SELECT COUNT(messageStatus)
		FROM inbox
		WHERE messageStatus = "new" and receiverId = ? AND receiverStatus = 2;`;
	connection.query(coursesQuery, [parentId], (error, results)=>{
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

router.get('/courses/:parentId/get', (req, res)=>{
	const parentId = req.params.parentId;
	// console.log("TEACHER ID:")
	// console.log(teacherId);
	var coursesQuery = `SELECT DISTINCT courseName, id, courseDesc, courses.teacherID FROM courses
			INNER JOIN students ON courses.teacherId = students.teacherId
			INNER JOIN studentParent ON studentParent.studentId = students.studentId
			WHERE studentParent.parentId = ?;`;
	connection.query(coursesQuery, [parentId], (error, results)=>{
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

router.get('/grades/:courseId/:parentId/get', (req, res)=>{
	const courseId = req.params.courseId;
	const parentId = req.params.parentId;
	// console.log("student ID:")
	// console.log(courseId);
	var gradesQuery = `SELECT * FROM students
		INNER JOIN assignmentStatus ON students.studentId = assignmentStatus.sid
		INNER JOIN assignments ON assignmentStatus.aid = assignments.id
		INNER JOIN studentParent ON studentParent.studentId = students.studentId
		WHERE assignmentStatus.cid = ? AND studentParent.parentId = ?;`;
	connection.query(gradesQuery, [courseId, parentId], (error, results)=>{
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

router.get('/inbox/:userId/get', (req, res)=>{
	const userId = req.params.userId;
	// // console.log("student ID:")
	// console.log('===========================================================');
	// console.log('===========================================================');
	// console.log('===========================================================');
	// console.log(userId);
	// console.log('===========================================================');
	// console.log('===========================================================');
	// console.log('===========================================================');
	var inboxQuery = `SELECT inbox.id, inbox.subject, inbox.body, inbox.receiverStatus,
		inbox.senderStatus, inbox.receiverId, inbox.senderId, inbox.senderName, inbox.messageStatus,
		DATE_FORMAT(inbox.date, '%M %D\, %Y') as date, status.level AS receiverLevel,
		s2.level AS senderLevel
		FROM inbox
		INNER JOIN status ON inbox.receiverStatus = status.statusId
		INNER JOIN status s2 ON inbox.senderStatus = s2.statusId
		WHERE inbox.receiverId = ? AND inbox.receiverStatus = 2
		ORDER BY inbox.date DESC;`;
	connection.query(inboxQuery, [userId], (error, results)=>{
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

router.get('/sentMessages/:userId/get', (req, res)=>{
	const userId = req.params.userId;
	var sentMessageQuery = `SELECT inbox.id, inbox.subject, inbox.body, inbox.receiverStatus,
		inbox.senderStatus, inbox.receiverName, inbox.receiverId, inbox.senderId, inbox.senderName, inbox.messageStatus,
		DATE_FORMAT(inbox.date, '%M %D\, %Y') as date, status.level AS receiverLevel,
		s2.level AS senderLevel
		FROM inbox
		INNER JOIN status ON inbox.receiverStatus = status.statusId
		INNER JOIN status s2 ON inbox.senderStatus = s2.statusId
		WHERE inbox.senderId = ? AND inbox.senderStatus = 1
		ORDER BY inbox.date DESC;`;
	connection.query(sentMessageQuery, [userId], (error, results)=>{
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

router.get('/messageToList/:parentId/:target/get', (req, res)=>{
	const targetTable = req.params.target;
	console.log(targetTable);
	const parentId = req.params.parentId;
	var messageToQuery = `SELECT DISTINCT CONCAT(teachers.firstName, " ", teachers.lastName) AS fullName, teachers.teacherId AS id FROM teachers
			INNER JOIN students ON students.teacherId = teachers.teacherId
			INNER JOIN studentParent ON studentParent.studentId = students.studentId
			WHERE studentParent.parentId = ?;`;
	connection.query(messageToQuery, [parentId], (error, results)=>{
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

router.post('/sendMessage', (req, res)=>{
	const subject = req.body.subject;
	const body = req.body.body;
	const receiverLevel = req.body.receiverLevel;
	const receiverStatusId = req.body.receiverStatusId;
	const receiverId = req.body.receiverId;
	const senderLevel = req.body.senderLevel;
	const senderName = req.body.senderName;
	const senderStatusId = req.body.senderStatusId;
	const senderId = req.body.senderId;
	const updateGrade = `INSERT INTO inbox (subject, body, receiverStatus, senderStatus, receiverId, senderId, senderName)
		VALUES
		(?, ?, ?, ?, ?, ?, ?);`;
	connection.query(updateGrade, [subject, body, receiverStatusId, senderStatusId, receiverId, senderId, senderName], (error, results)=>{
		if(error){
			throw error;
		}else{
			res.json({
				msg: "messageSent"
			});
		}
	});
});

router.get('/:parentId/calendar/get', (req, res)=>{
	const parentId = req.params.parentId;
	const getEvents = `SELECT * FROM calendar
		INNER JOIN students ON students.teacherId = calendar.teacherId
		INNER JOIN studentParent ON studentParent.studentId = students.studentId 
		WHERE studentParent.parentId = ?;`;
	connection.query(getEvents, [parentId], (error, results)=>{
		if(error){
			throw error;
		}else{
			console.log(results)
			res.json(results);
		}
	})	

});

module.exports = router;
