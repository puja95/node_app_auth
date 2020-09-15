/**
 * Required External Modules
 */
const express = require("express");
const { appendFile } = require("fs");
const path = require("path");
var bcrypt = require('bcryptjs');

var bodyParser = require('body-parser');
const dbConnection = require('./db');
var jwt = require('jsonwebtoken');
const secret = 'supersecret';
const expiresIn = 3600;


/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";
/**
 *  App Configuration
 */

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));


/**
 * Routes Definitions
 */
app.get("/", (req, res) => {
  res.status(200).send("Hello!!");
});

// sample Request ----
// {
//   "email": "mymail@gmail.com",
//   "password":"pass123",
//   "age":"24",
//   "role":"admin"
// }
app.post('/register', function(req, res) {
  console.log(req.body);
  // connecting to Database
  connection = dbConnection.dbConnection();
  // encryping password
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  // inserting data to table
  var sql = "INSERT INTO users.users ( `email`, `password`, `age`, `role`) VALUES ( '"+req.body.email+"' , '"+hashedPassword+"','"+req.body.age+"', '"+req.body.role+"')";
  connection.query( sql, function (error, results, fields) {
      console.log(error);
      console.log(results);
  if (error) return res.status(500).send({ auth: false })
  connection.end();
  // creating a jwt token using secret as 'supersecret'
  var token = jwt.sign({ id: results.insertId }, secret, {
  expiresIn: expiresIn // expires in 24 hours
  });	
  res.status(200).send({ auth: true, token: token });
  });
  });


  // sample request ---
//   {
//     "id":"3",
//     "password":"pass123"
    
// }

app.post('/login', function(req, res) {

var reqobj = req.body;
var id = reqobj.id;
var password = reqobj.password;
connection = dbConnection.dbConnection();

// fetching user details according to user id
var sql=`select * from users.users where id='${id}'`;
connection.query( sql, function (error, results, fields) {

  // comparing encrypted password with the stored password
var passwordIsValid = bcrypt.compareSync(password, results[0].password);
console.log("is password valid?",passwordIsValid);

if (error){
console.log("ERROR IN /login : ",error);
return res.status(500).send({ auth: false })
} 

// checking if password is valid
if (passwordIsValid)
res.status(200).send({ auth: true, status:"login successfull",details:results});
else
return res.status(401).send({ auth: false });


});
});

/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
