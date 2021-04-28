const express = require("express")
const issueRouter = express.Router()
const Issue = require('../models/Issue')

issueRouter.get('/', (req, res, next) => {
    Issue.find((err, issue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(issue)
    })
  })

  module.exports = issueRouter