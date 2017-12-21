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
	const insertStudent = `INSERT INTO students (firstName, lastName, username, password, email, phone) 
		VALUES 
		(?,?,?,?,?,?);`;
	connection.query(insertStudent, [firstName, lastName, username, hash, email, phone],(error, results)=>{
		if(error){
			throw error;
		}else{
			res.json({
				msg: "registerStudentSuccess"
			})
		}
	})
});

router.post('/studentLogin', (req, res)=>{
	console.log('studentLoggedIn');
	const username = req.body.username;
	const password = req.body.password;
	const checkStudent = `SELECT * FROM students WHERE username = ?;`;
	connection.query(checkStudent, [username],(error, results)=>{
		if(error){
			throw error;
		}else if(results.length == 0){
			// username not in database
			res.json({
				msg: 'badUsername'
			});
		}else{
			if(bcrypt.compareSync(password, results[0].password)){
				// good password
				res.json({
					msg: 'loginSuccess'
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
