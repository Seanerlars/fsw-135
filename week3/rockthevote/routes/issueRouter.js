authRouter.get('/', (req, res, next) => {
    Issue.find((err, issue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(issue)
    })
  })