var express = require('express');
var router = express.Router();
var config = require('../config/config.js');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var connection = mysql.createConnection(config);
connection.connect();

router.get('/countNewMessages/:teacherId/get', (req, res)=>{
	const teacherId = req.params.teacherId;
	// console.log("TEACHER ID:")
	// console.log(teacherId);
	var coursesQuery = `SELECT COUNT(messageStatus)
		FROM inbox
		WHERE messageStatus = "new" and receiverId = ? AND receiverStatus = 1;`;
	connection.query(coursesQuery, [teacherId], (error, results)=>{
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

router.get('/grades/:courseId/:teacherId/get', (req, res)=>{
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

router.post('/changeStatus', (req, res)=>{
	const newStatus = req.body.newStatus;
	const aid = req.body.aid;
	const sid = req.body.sid;
	const updateStatus = `UPDATE assignmentStatus
		SET status = ?
		WHERE aid = ? AND sid = ?;`;
	connection.query(updateStatus, [newStatus, aid, sid], (error, results)=>{
		if(error){
			throw error;
		}else{
			res.json({
				msg: "statusUpdated"
			});
		}
	});
});

router.post('/changeGrade', (req, res)=>{
	const newGrade = req.body.newGrade;
	const aid = req.body.aid;
	const sid = req.body.sid;
	const updateGrade = `UPDATE assignmentStatus
		SET grade = ?
		WHERE aid = ? AND sid = ?;`;
	connection.query(updateGrade, [newGrade, aid, sid], (error, results)=>{
		if(error){
			throw error;
		}else{
			res.json({
				msg: "gradeUpdated"
			});
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
		inbox.senderStatus, inbox.receiverId, inbox.senderId, inbox.senderName, inbox.messageStatus,
		DATE_FORMAT(inbox.date, '%M %D\, %Y') as date, status.level AS receiverLevel,
		s2.level AS senderLevel
		FROM inbox
		INNER JOIN status ON inbox.receiverStatus = status.statusId
		INNER JOIN status s2 ON inbox.senderStatus = s2.statusId
		WHERE inbox.receiverId = ? AND inbox.receiverStatus = 1;`;
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

router.get('/message/:messageId/get', (req, res)=>{
	const messageId = req.params.messageId;
	// console.log("student ID:")
	// console.log('===========================================================');
	// console.log('===========================================================');
	// console.log('===========================================================');
	// console.log(userId);
	// console.log('===========================================================');
	// console.log('===========================================================');
	// console.log('===========================================================');
	var updateMessageStatus = `UPDATE inbox
		SET messageStatus = 'read'
		WHERE id = ?;`;
	connection.query(updateMessageStatus, [messageId], (error)=>{
		if(error){
			throw error
		}else{
			var messageQuery = `SELECT id, subject, body, receiverStatus, senderStatus,
				receiverId, senderId, senderName, DATE_FORMAT(date, '%M %D\, %Y') as date,
				messageStatus FROM inbox
				WHERE id = ?;`;
			connection.query(messageQuery, [messageId], (error, results)=>{
				if(error){
					throw error;
				}else{
					console.log("============");
					console.log(results);
					console.log("============");
					res.json(results);
				}
			});
		}
	});

});

router.get('/messageToList/:teacherId/:target/get', (req, res)=>{
	const targetTable = req.params.target;
	console.log(targetTable);
	const teacherId = req.params.teacherId;
	var messageToQuery;
	if(targetTable == 'parents'){
		messageToQuery = `SELECT DISTINCT CONCAT(parents.firstName, " ", parents.lastName) AS fullName, parents.parentId AS id FROM parents
			INNER JOIN studentParent ON studentParent.parentId = parents.parentId
			INNER JOIN students ON students.studentId = studentParent.studentId
			WHERE students.teacherId = ?;`;
	}else if(targetTable == 'students'){
		messageToQuery = `SELECT DISTINCT CONCAT(firstName, " ", lastName) AS fullName, studentId AS id FROM students
			WHERE teacherId = ?;`;
	}
	connection.query(messageToQuery, [teacherId], (error, results)=>{
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
			if(receiverLevel === "student"){ // message also gets sent to parent(s)
				const getParentInfo = `SELECT * FROM students
					INNER JOIN studentParent ON studentParent.studentId = students.studentId
					INNER JOIN parents ON parents.parentId = studentParent.parentId
					WHERE studentParent.studentId = ?;`;
				connection.query(getParentInfo, [receiverId], (error, results)=>{
					if(error){
						throw error
					}else{
						console.log("Parents are being located");
						results.map((result, index)=>{
							var parentId = result.parentId
							var ccParentMessage = `INSERT INTO inbox (subject, body, receiverStatus, senderStatus, receiverId, senderId, senderName)
								VALUES
								(?, ?, 2, 1, ?, ?, ?);`;
							connection.query(ccParentMessage, [subject, body, parentId, senderId, senderName], (error)=>{
								if(error){
									throw error;
								}else{
									console.log("Message sent to parents as well!");
								}
							})
						});
							res.json({
								msg: "messageSent"
							});
					}
				});
			}else{ // sent to parent only
				res.json({
					msg: "messageSent"
				});
			}
		}
	});
});
router.get('/:teacherId/calendar/get', (req, res)=>{
	const teacherId = req.params.teacherId;
	const getEvents = `SELECT * FROM calendar 
		WHERE teacherId = ?;`;	
	connection.query(getEvents, [teacherId], (error, results)=>{
		if(error){
			throw error;
		}else{
			console.log(results)
			res.json(results);
		}
	})	
});

router.post('/addEvents', (req, res)=>{
	const courseId = parseInt(req.body.courseId);
	const title = req.body.title;
	const start = req.body.start;
	const end = req.body.end;
	const desc = req.body.desc;
	const teacherId = parseInt(req.body.teacherId);
	const addEvent = `INSERT INTO calendar (courseId, title, start, end, eventDesc, teacherId)
		VALUES
		(?, ?, ?, ?, ?, ?)`;
	connection.query(addEvent, [courseId, title, start, end, desc, teacherId], (error, results)=>{
		if(error){
			throw error;
		}else{
			res.json({
				msg: "eventAdded"
			});
		}
	});
});

module.exports = router;
