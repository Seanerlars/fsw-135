const express = require('express')
const itemsRouter = express.Router()
const Item = require('../models/items.js')

const items = [
   {name: "Apple", type: "Food", year_made:2021 },
   {name: "Shirt", type: "Clothing", year_made:2012 },
   {name: "Computer", type: "Tech", year_made:2018 },
   {name: "Head Phones", type: "Tech", year_made:2015 }
]



 itemsRouter.get("/", (req, res, next) => {
    Item.find({active_ind: 1}, (err, items) => {
       if(err){
         res.status(500)
         return next(err)
       }
       return res.status(200).send(items)
    })
 })

 itemsRouter.post("/", (req, res, next) => {
   const newItem = new Item (req.body)
   newItem.save((err, savedItem) => {
     if(err){
       res.status(500)
       return next(err)
     }
     return res.status(201).send(savedItem)
   })
 })

 itemsRouter.delete("/:itemId", (req, res, next) => {
   Item.findOneAndDelete(
     {_id: req.params.ItemId}, 
     (err, deletedItem) => {
       if(err){
         res.status(500)
         return next(err)
       }
       return res.status(200).send(`Successfully deleted item ${deletedItem.title} from the database`)
     }
   )
 })

 itemsRouter.put("/:itemId", (req, res, next) => {
   Item.findOneAndUpdate(
     { _id: req.params.itemID},
     req.body,
     {new: true},
     (err, updatedItem) => {
       if(err){
         res.status(500)
         return next(err)
       }
       return res.status(201).send(updatedItem)
     }
   )  
 })





       
       
 module.exports = itemsRouter