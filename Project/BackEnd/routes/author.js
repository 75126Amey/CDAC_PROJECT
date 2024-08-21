const express = require("express");
const db = require("../db");
const utils = require("../utils");
const jwt = require("jsonwebtoken");
const config = require("../config");
const multer = require("multer");
const router = express.Router();
const crypto = require("crypto-js");
const path = require("path");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === "image/jpeg" && file.fieldname === "photo") {
      cb(null, "author_photo");
    } else if (
      file.mimetype === "image/jpeg" &&
      file.fieldname === "identification"
    ) {
      cb(null, "author_identification");
    } else {
      console.log(file.mimetype);
      cb({ error: "Mime type not supported" });
    }
  },

  filename: function (req, file, cd) {
    cd(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({storage: storage});
router.get("/details", (req, res) => {
  const query = "Select user.email,user_role,user.user_id,self_author.user_id,status from user inner join self_author where self_author.user_id = user.user_id and user.user_id = ?";
  db.pool.execute(query, [req.userId], (err, result) => {
    res.send(utils.createResult(err, result));
  });
});

router.post("/register2",upload.any(),(req,res)=>{
  const{firstName,lastName,dob,phoneNo,bankAccountNo,ifscNo,userId,email2} = req.body;
  let photo;
  let identification;
  const sql = "Insert into self_author(user_id,first_name,last_name,email,phone_no,dob,photo,identification,bank_account_no,IFSC_code ) values(?,?,?,?,?,?,?,?,?,?)";
 req.files.forEach((ele)=>{
  if(ele.fieldname==='photo'){
      photo = ele.filename
  }
  else if(ele.fieldname==='identification'){
      identification = ele.filename
  }
 })
  db.pool.execute(sql,[userId,firstName,lastName,email2,phoneNo,dob,photo,identification,bankAccountNo,ifscNo],(err,result)=>{
    console.log(err)
    console.log("userid: "+userId,"fn: "+firstName,"ln:"+lastName,"email:"+email2,phoneNo,dob,photo,identification,bankAccountNo,ifscNo)
         res.send(utils.createResult(err,result));
  })
});

router.get("/getUserId/:email", (req, res) => {
  const { email } = req.params;
  const statement = `select user_id from user where email = ?`;
  db.pool.query(statement, [email], (err, result) => {
    res.send(utils.createResult(err, result));
  });
});
module.exports = router;
