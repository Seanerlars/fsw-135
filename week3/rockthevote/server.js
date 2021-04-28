const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')


app.use(express.json()) 
app.use(morgan('dev')) 


mongoose.connect('mongodb://localhost:27017/rockthevote',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  () => console.log('Connected to the DB')
)

app.use('/auth', require('./routes/authRouter.js'))
app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['sha1', 'RS256', 'HS256']}))
app.use('/api/auth', require('./routes/authRouter.js'))



app.use((err, req, res, next) => {
  console.log(err)
    if(err.name === "Unauthorized Error"){
      res.status(err.status)
    }
  return res.send({errMsg: err.message})
})


app.listen(9000, () => {
  console.log('The server is running on Port 9000')
})