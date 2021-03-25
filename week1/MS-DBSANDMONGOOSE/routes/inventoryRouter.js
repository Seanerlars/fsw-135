const express = require('express')
const inventoryRouter = express.Router()






const inventory = [
    {name: "Apple", 
    type: "Food",
    year_made: 2021},

    
    
]



inventoryRouter.get("/", (req,res, next) => {
    return res.status(200).send(inventory)
})

inventoryRouter.get("/search/type", (req, res, next) => {
    const type = req.query.type
        if(!type){
            const error = new Error("You must provide type")
            res.status(500)
            return next(error)
        }
        const filteredItems = inventory.filter(inventory => inventory.type === type)
        return res.status(200).send(filteredItems)
})

       
       
 module.exports = inventoryRouter