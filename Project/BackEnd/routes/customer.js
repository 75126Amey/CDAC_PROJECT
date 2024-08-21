const express = require("express");
const db = require("../db");
const utils = require("../utils");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");
const config = require("../config");

const router = express.Router();

router.get("/getUserId/:email",(req,res)=>{
const {email} = req.params;
const statement = `select user_id from user where email = ?`;
db.pool.query(statement,[email],(err,result)=>{
  res.send(utils.createResult(err,result));
})
})
router.get("/details",(req,res)=>{
  const statement = `select * from customer where user_id =?;`
  db.pool.execute(statement, [req.userId], (error, result) => {
    res.send(utils.createResult(error, result))
  })
})
router.post("/register2", (request, response) => {
  const { firstName, lastName, phoneNo, dob, profession,userId} = request.body;
  const statement = `insert into customer (first_name,last_name,contact_no,dob,profession,user_id) values (?,?,?,?,?,?);`;
  db.pool.execute(statement, [firstName, lastName, phoneNo, dob, profession,userId], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});
// router.post('/login', (request, response) => {
//   const { email, password} = request.body
//   const statement = `select user_id, email,user_role from user where email = ? and password = ?`
//   const encryptedPassword = String(crypto.SHA256(password))
//   db.pool.query(statement, [email, encryptedPassword], (error, users) => {
//     console.log(users);
//     if (error) {
//       response.send(utils.createErrorResult(error))
//     } else {
//       if (users.length == 0) {
//         response.send(utils.createErrorResult('user does not exist'))
//       } else {
//         const user = users[0]
//         // create the payload
//         const payload = { id: user.user_id,}
//         const token = jwt.sign(payload, config.secret)
//         const userData = {
//           token,
//           role:user.user_role
//         }
//         response.send(utils.createSuccessResult(userData))
//       }
//     }
//   })
// })

module.exports = router;
