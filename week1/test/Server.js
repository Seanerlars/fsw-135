const express = require("express");
const app = express ();
const morgan = require("morgan")
const mongoose = require('mongoose')

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect('mongodb://localhost:27017/moviesdb'),
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true

  },
  () => console.log("Connected to the DB")





app.get('/', (req,res) => {
    res.send("good Morning");
});






