const express = require("express");
const db = require("../db");
const utils = require("../utils");
const jwt = require("jsonwebtoken");
const config = require("../config");
const multer = require("multer");
const router = express.Router();
const path = require("path");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === "application/epub+zip") {
      cb(null, "manuscript");
    } else if (file.mimetype === "image/jpeg") {
      cb(null, "cover");
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

var upload = multer({ storage: storage });
router.post("/add", upload.any(), async(req, res) => {
  let arr = JSON.parse(req.body.authorTokens)
  for(let i = 0; i <arr.length; i++) {
    console.log(arr[i]);
  }
  const {
    title,
    isbn,
    bookSubtitle,
    price,
    isRentable,
    pages,
    longDesc,
    shortDesc,
    publishDate,
    publisherId,
    authorTokens
  } = req.body;
  console.log(req.body);
  let cover;
  let file;
  const query1 =
    "Insert into book(book_title,cover_image,manuscript,isbn,book_subtitle,base_price,is_rentable,pages,long_desc,short_desc,date_published,publisher_id) values(?,?,?,?,?,?,?,?,?,?,?,?)";
  req.files.forEach((ele) => {
    if (ele.fieldname === "coverImage") {
      cover = ele.filename;
    } else if (ele.fieldname === "manuscript") {
      file = ele.filename;
    }
  });
  db.pool.query(
    query1,
    [
      title,
      cover,
      file,
      isbn,
      bookSubtitle,
      price,
      isRentable,
      pages,  
      longDesc,
      shortDesc,
      publishDate,
      publisherId=="null" ? null :publisherId
    ],
    (err, result) => {

      if(err){
        res.send(utils.createErrorResult(err));
      }
      else{
        let query2 = "Insert into book_author(author_id,book_id,author_ordinal) values ?";
     
        let arr = JSON.parse(authorTokens)
        let arr2=[]
        for(let i = 0; i <arr.length; i++) {
          arr2.push([arr[i],result.insertId,i+1])
        }
          db.pool.query(query2,[arr2],(err2,result2)=>{
            res.send(utils.createResult(err2, result2));
          });
        }
    
       
      }
     
    
  );
});
router.get("/list", (request, response) => {
  const statement = `Select book_title,cover_image,manuscript from book`;
  db.pool.query(statement, (error, categories) => {
    let senData = error ? error : categories;
    response.send(senData);
  });
});
module.exports = router;
