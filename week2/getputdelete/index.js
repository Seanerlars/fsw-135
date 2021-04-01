const express = require ("express")
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')


app.use(express.json)
app.use(morgan('dev'))



mongoose.connect('mongodb://localhost:27017/itemsdb',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log("Connected to the Db")
)

app.use('/items', require("./routes/itemsRouter.js"))

app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})


app.listen(9000, () => {
    console.log("the server is running")
})