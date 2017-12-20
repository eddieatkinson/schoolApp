var express = require('express');
var router = express.Router();
var config = require('../config/config.js');
var mysql = require('mysql');


var connection = mysql.createConnection(config);
connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
