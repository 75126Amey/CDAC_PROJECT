const express = require("express");
const db = require("../db");
const utils = require("../utils");

const router = express.Router();

router.get("/list", (request, response) => {
  const statement = `Select category_id,category_name,parent_id from category`;
  db.pool.query(statement, (error, categories) => {
   response.send(utils.createResult(error, categories));
  });
});
module.exports = router;
