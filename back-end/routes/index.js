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
	res.json({
		msg: "teacherRegistered"
	});
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
