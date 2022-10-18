'use strict';

const dynamoose = require('dynamoose');

const schema = new dynamoose.Schema({
  bidId: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  itemID: {
    type: String,
    required: true,
  },
  newBid: {
    type: Number,
    required: true,
  },

})

const BidModel = dynamoose.model('changeBid', schema);

exports.handler = async (event) => {
   let bidData = await BidModel.query('bidId').eq(event.pathParameters.bidId).exec();
   let parsedData = bidData;
   let parsedBody = JSON.parse(event.body);
   parsedData[0].name = parsedBody.name;
   console.log(parsedData[0].name)
   parsedData[0].save()
   return {
    statusCode: 200,
    body: 'bid updated'
   }
}