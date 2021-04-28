const express = require("express")
const commentRouter = express.Router()
const Comment = require('../models/Comment')




commentRouter.post('/', (req, res, next) => {
    const newComment = new Comment(req.body)
    newComment.save((err, savedComment) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(savedComment)
    })
  })

commentRouter.put("/like/:commentID", (req, res, next) => {
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

  commentRouter.delete("/:commentId", (req, res, next) => {
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

  module.exports = commentRouter