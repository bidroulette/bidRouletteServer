'use strict';

const dynamoose = require('dynamoose');

const schema = new dynamoose.Schema({
    itemID:{
        type: String,
        required: true,
    },
    itemName:{
        type:String,
        required:true,
    },
    itemDescription:{
        type:String,
        required:true,
    },
    itemOpeningBid:{
        type: Number,
        required:true,
    },
})

const ItemModel = dynamoose.model('item', schema);

exports.handler = async (event) => {
    let parsedData = JSON.parse(event.body)
    let newItem = new ItemModel(parsedData)
     console.log(newItem)
    let dataSend = await newItem.save();
    return {
        statusCode: 200,
        body: "new item added"
    }
}