var express = require('express');
var router = express.Router();
var config = require('../config/config.js');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var connection = mysql.createConnection(config);
connection.connect();

router.get('/courses/:teacherId/get', (req, res)=>{
	const teacherId = req.params.teacherId;
	var coursesQuery = `SELECT * FROM courses
		INNER JOIN teachers ON courses.teacherId = teachers.teacherId
		WHERE courses.teacherId = ?;`;
	connection.query(coursesQuery, [teacherId], (error, results)=>{
		if(error){
			throw error;
		}else{
			console.log(results);
			res.json(results);
		}
	});
});

// /* GET users listing. */
// router.get('/', function(req, res, next) {
 
// });

module.exports = router;
