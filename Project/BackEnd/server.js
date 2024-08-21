const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const config = require('./config')
const utils = require('./utils')

const app = express()
app.use(cors())
app.use(express.json())
app.use("/manuscript", express.static(__dirname + "/manuscript"));
app.use("/cover", express.static(__dirname + "/cover"));
app.use("/author_identification", express.static(__dirname + "/author_identification"));
app.use("/author_photo", express.static(__dirname + "/author_photo"));
// middleware to verify the token
app.use((request, response, next) => {

  if (
    request.url === '/user/login' ||
    request.url === '/user/register'||request.url==='/customer/register1'||request.url=== '/customer/register2'
   || request.url.split("/")[2]==="getUserId"||request.url==='/book/list'||request.url==='/author/register1'||request.url==='/author/register2'
   ||request.url==='/category/list'
  ) {
    // skip verifying the token
    next()
  } else {

    const token = request.headers['token']

    if (!token || token.length === 0) {
      response.send(utils.createErrorResult('missing token'))
    } else {
      try {

        const payload = jwt.verify(token, config.secret)

       
        request.userId = payload['id']


        next()
      } catch (ex) {
        response.send(utils.createErrorResult('invalid token'))
      }
    }
  }
})

const userRouter = require('./routes/user')
const authorRouter = require('./routes/author')
const customerRouter = require('./routes/customer')
const bookRouter = require('./routes/book')
const adminRouter = require('./routes/admin');
const categoriesRouter = require('./routes/category')
app.use('/user', userRouter)
app.use('/author', authorRouter)
app.use('/customer', customerRouter)
app.use("/book",bookRouter)
app.use("/admin",adminRouter)
app.use("/category",categoriesRouter)
app.listen(4000, '0.0.0.0', () => {
  console.log(`server started on port 4000`)
})