const express = require('express')
const inventoryRouter = express.Router()






const inventory = [
    {Name: "Apple", 
    type: "Food",
    year_made: 2021},

    
    
]



inventoryRouter.route("/")
.get((req, res) => {
    res.send(inventory)})
.post((req, res) => {
        const newItem = req.body
        newHItem._id = uuid
        inventory.push(newItem)
        res.send(newItem)})

       
       
 module.exports = inventoryRouter