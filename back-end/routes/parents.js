var express = require('express');
var router = express.Router();
var config = require('../config/config.js');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var connection = mysql.createConnection(config);
connection.connect();

router.get('/courses/:parentId/get', (req, res)=>{
	const parentId = req.params.parentId;
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

router.get('/inbox/:userId/get', (req, res)=>{
	const userId = req.params.userId;
	// console.log("student ID:")
	console.log('===========================================================');
	console.log('===========================================================');
	console.log('===========================================================');
	console.log(userId);
	console.log('===========================================================');
	console.log('===========================================================');
	console.log('===========================================================');
	var inboxQuery = `SELECT inbox.id, inbox.subject, inbox.body, inbox.receiverStatus,
		inbox.senderStatus, inbox.receiverId, inbox.senderId, inbox.senderName, inbox.date,
		status.level AS receiverLevel, s2.level AS senderLevel
		FROM inbox
		INNER JOIN status ON inbox.receiverStatus = status.statusId
		INNER JOIN status s2 ON inbox.senderStatus = s2.statusId
		WHERE inbox.receiverId = ? AND inbox.receiverStatus = 2;`;
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

module.exports = router;
