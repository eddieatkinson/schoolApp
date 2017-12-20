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
	const insertTeacher = `INSERT into teachers (firstName, lastName, password, email, phone) 
		VALUES 
		(?,?,?,?,?);`;
	connection.query(insertTeacher, [firstName, lastName, password, email, phone],(error, results)=>{
		if(error){
			console.log("This is broken");
			throw error;
		}else{
			console.log("Your mom");
			res.json({
				msg: "registerSuccess"
			})
		}
	})	
});

router.post('/parentRegister', (req, res)=>{
	console.log('parent');
	res.json({
		msg: "parentRegistered"
	});
});

router.post('/studentRegister', (req, res)=>{
	console.log('student');
	res.json({
		msg: "studentRegistered"
	});
});

module.exports = router;
