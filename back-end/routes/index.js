var express = require('express');
var router = express.Router();
var config = require('../config/config.js');
var mysql = require('mysql');
var randToken = require('rand-token');
var bcrypt = require('bcrypt-nodejs');


var connection = mysql.createConnection(config);
connection.connect();

router.post('/teacherRegister', (req, res)=>{
	console.log('teacher');
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const phone = req.body.phone;
	const username = req.body.username;
	const hash = bcrypt.hashSync(req.body.password);
	const insertTeacher = `INSERT INTO teachers (firstName, lastName, username, password, email, phone) 
		VALUES 
		(?,?,?,?,?,?);`;
	connection.query(insertTeacher, [firstName, lastName, username, hash, email, phone],(error, results)=>{
		if(error){
			throw error;
		}else{
			res.json({
				msg: "registerTeacherSuccess"
			});
		}
	})	
});

router.post('/parentRegister', (req, res)=>{
	console.log('parent');
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const phone = req.body.phone;
	const username = req.body.username;
	const hash = bcrypt.hashSync(req.body.password);
	const insertParent = `INSERT INTO parents (firstName, lastName, username, password, email, phone) 
		VALUES 
		(?,?,?,?,?,?);`;
	connection.query(insertParent, [firstName, lastName, username, hash, email, phone],(error, results)=>{
		if(error){
			throw error;
		}else{
			res.json({
				msg: "registerParentSuccess"
			})
		}
	})
});

router.post('/studentRegister', (req, res)=>{
	console.log('student');
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const phone = req.body.phone;
	const username = req.body.username;
	const hash = bcrypt.hashSync(req.body.password);
	const token = randToken.uid(60);
	const insertStudent = `INSERT INTO students (firstName, lastName, username, password, email, phone, token) 
		VALUES 
		(?,?,?,?,?,?,?);`;
	connection.query(insertStudent, [firstName, lastName, username, hash, email, phone, token],(error, results)=>{
		if(error){
			throw error;
		}else{
			res.json({
				msg: "registerStudentSuccess"
			})
		}
	})
});

router.post('/login/student', (req, res)=>{
	console.log('studentLoggedIn');
	const username = req.body.loginId;
	const password = req.body.password;
	const checkStudent = `SELECT *, CONCAT(firstName, " ", lastName) AS fullName FROM students
		INNER JOIN status ON students.statusId = status.statusId
		WHERE username = ?;`;
	connection.query(checkStudent, [username],(error, results)=>{
		if(error){
			throw error;
		}else if(results.length == 0){
			// username not in database
			res.json({
				msg: 'badLoginId'
			});
		}else{
			const checkHash = bcrypt.compareSync(password, results[0].password);
			if(checkHash){
				// good password
				const newToken = randToken.uid(60);
				const name = results[0].firstName;
				const fullName = results[0].fullName;
				const statusId = results[0].statusId;
				const level = results[0].level;
				res.json({
					msg: 'loginStudentSuccess',
					token: newToken,
					statusId: statusId,
					name: name,
					fullName: fullName,
					level: level
				});
			}else{
				// wrong password
				res.json({
					msg: 'badPass'
				});
			}

		}
	})
});

router.post('/login/parent', (req, res)=>{
	console.log('parentLoggedIn');
	const email = req.body.loginId;
	const password = req.body.password;
	const checkParent = `SELECT *, CONCAT(firstName, " ", lastName) AS fullName FROM parents
		INNER JOIN status ON parents.statusId = status.statusId
		WHERE email = ?;`;
	connection.query(checkParent, [email],(error, results)=>{
		if(error){
			throw error;
		}else if(results.length == 0){
			// email not in database
			res.json({
				msg: 'badLoginId'
			});
		}else{
			const checkHash = bcrypt.compareSync(password, results[0].password);
			if(checkHash){
				// good password
				const newToken = randToken.uid(60);
				const name = results[0].firstName;
				const fullName = results[0].fullName;
				const statusId = results[0].statusId;
				const level = results[0].level;
				res.json({
					msg: 'loginParentSuccess',
					token: newToken,
					statusId: statusId,
					name: name,
					fullName: fullName,
					level: level
				});
			}else{
				// wrong password
				res.json({
					msg: 'badPass'
				});
			}

		}
	})
});

router.post('/login/teacher', (req, res)=>{
	console.log('teacherLoggedIn');
	const email = req.body.loginId;
	const password = req.body.password;
	const checkTeacher = `SELECT *, CONCAT(firstName, " ", lastName) AS fullName FROM teachers
		INNER JOIN status ON teachers.statusId = status.statusId
		WHERE email = ?;`;
	connection.query(checkTeacher, [email],(error, results)=>{
		if(error){
			throw error;
		}else if(results.length == 0){
			// email not in database
			res.json({
				msg: 'badLoginId'
			});
		}else{
			const checkHash = bcrypt.compareSync(password, results[0].password);
			if(checkHash){
				// good password
				const newToken = randToken.uid(60);
				const name = results[0].firstName;
				const fullName = results[0].fullName;
				const teacherId = results[0].teacherId;
				const statusId = results[0].statusId;
				const level = results[0].level;
				res.json({
					msg: 'loginTeacherSuccess',
					token: newToken,
					statusId: statusId,
					name: name,
					fullName: fullName,
					teacherId: teacherId,
					level: level
				});
			}else{
				// wrong password
				res.json({
					msg: 'badPass'
				});
			}

		}
	})
});

module.exports = router;
