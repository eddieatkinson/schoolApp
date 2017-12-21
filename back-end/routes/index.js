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
			})
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

module.exports = router;
