const express = require('express')
const db = require('../db')
const utils = require('../utils')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const config = require('../config')

const router = express.Router()

router.get("/verify", (req,res)=>{
  const statement = `select user_role from user where user_id =?;`
  db.pool.execute(statement, [req.userId], (error, result) => {
    res.send(utils.createResult(error, result))
  })
});

module.exports = router