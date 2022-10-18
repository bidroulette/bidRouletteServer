'use strict';

const dynamoose = require('dynamoose');

const schema = new dynamoose.Schema({
    userID:{
        type: String,
        required: true,
    },
    userName:{
        type:String,
        required:true,
    },
    userEmail:{
        type:String,
        required:true,
    },
    
})

const UserModel = dynamoose.model('user', schema);

exports.handler = async (event) => {
    let parsedData = JSON.parse(event.body)
    let newUser = new UserModel(parsedData)
     console.log(newItem)
    let dataSend = await newUser.save();
    return {
        statusCode: 200,
        body: "new user added"
    }
}