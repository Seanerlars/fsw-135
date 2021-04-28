const express = require('express')
const authRouter = express.Router()
const Issue = require('../models/Issue.js')
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')
const Comment = require('../models/Comment.js')
const { rawListeners } = require('../models/Issue.js')


authRouter.get('/', (req, res, next) => {
  Issue.find((err, issue) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issue)
  })
})

authRouter.get('/', (req, res, next) => {
  User.find((err, User) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(User)
  })
})




authRouter.post('/', (req, res, next) => {
  const newComment = new Comment(req.body)
  newComment.save((err, savedComment) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedComment)
  })
})

// Signup
authRouter.post("/signup", (req, res, next) => {
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if(err){
      res.status(500)
      return next(err)
    }
    if(user){
      res.status(403)
      return next(new Error('Username Already Exists'))
    }
    const newUser = new User(req.body)
    newUser.save((err, savedUser) => {
      if(err){
        res.status(500)
        return next(err)
      }
      const token = jwt.sign(savedUser.toObject(), process.env.SECRET)
      return res.status(201).send({ token, user: savedUser })
    })
  })
})

authRouter.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if(err){
      res.status(500)
      return next(err)
    }
    if(!user || req.body.password !== user.password){
      res.status(403)
      return next(new Error('Invalid Credentials'))
    }
    const token = jwt.sign(user.toObject(), process.env.SECRET)
    return res.status(200).send({ token, user })
  })
})





  authRouter.put("/like/:commentID", (req, res, next) => {
    Comment.findOneAndUpdate(
      { _id: req.params.commentID },
      { $inc: { likes : 1 } },
      { new: true },
      (err, updatedComment) => {
        if(err) {
          res.status(500)
          return next (err)
        }
        return res.status(201).send(updatedComment)
      }
    )
  })

  
  authRouter.delete("/:commentId", (req, res, next) => {
    Comment.findOneAndDelete(
      {_id: req.params.CommentId}, 
      (err, deletedComment) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully deleted comment ${deletedComment.title} from the database`)
      }
    )
  })

 

module.exports = authRouter