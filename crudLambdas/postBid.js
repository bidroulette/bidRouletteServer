'use strict';

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

const BidModel = dynamoose.model('newBid', schema);

exports.handler = async (event) => {
    let parsedData = JSON.parse(event.body)
    let newBid = new BidModel(parsedData)
     console.log(newBid)
    let dataSend = await newBid.save();
    return {
        statusCode: 200,
        body: "new bid added"
    }
}