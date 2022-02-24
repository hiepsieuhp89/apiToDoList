var express = require('express')
var router = express.Router();
const jwt = require("jsonwebtoken")
const Ajv = require("ajv")
var axios = require('axios');
const userController = require("../controller/user.controller");
const verify = require("../middleware/checkToken")
const todoSchema = require("../schema/todos.schema")
const checkTodoExisting = require("../helper/helper")

//initiate
const ajv = new Ajv()

//login
router.post('/login', function(req, res, next) {
  //get data from body request
  
});
//Signup
router.post('/signup', function(req, res, next) {
  //get data from body request
  
});


//review token to auto login
router.post('/renew', function(req, res, next) {
  var loginUser = req.body;
  const token = jwt.sign({_id: loginUser._id}, process.env.SECRET_TOKEN)
  res.header("auth-token", token).send(token);
});

// CUR

//get all todo job
router.get('/', function(req, res, next) {
  axios.get('http://localhost:9200/todo_store/todos/_search')
  .then(response => res.json(response.data))
  //res.render('login',{bodyClass: 'login-page'});
});

//get a todo job
router.get('/:id', function(req, res, next) {
  axios.get(`http://localhost:9200/todo_store/todos/${req.params.id}`)
  .then(response => res.json(response.data))
});

//add a todo job
router.post('/', function(req, res, next) {

  //get data from body request
  const todo = req.body;
  console.log(todo);

  //validate data
  const validate = ajv.compile(todoSchema)
  const valid = validate(todo)


  if (!valid) {
    console.log(validate.errors)
    res.status(400).send('Invalid');
  }
  else{
    axios.post(`http://localhost:9200/todo_store/todos`,todo).then(response => res.status(201).json({status: response.data.created}));
  }
});

//edit a todo job
router.put('/:id', function(req, res, next) {
  const todo = req.body;
  console.log(todo);
  axios.put(`http://localhost:9200/todo_store/todos/${req.params.id}`,todo).then(response => res.json({status: response.data.updated}));
});

module.exports = router;
