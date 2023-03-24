const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

let User = new Schema({
    id:{
        type:Number
    },
    username: {
        type:String
    },
    email:{
        type:String
    },
    chooseadate: {
        type: String
    },
    phonenumber: {
        type: Number
    },
    password:{
       
        type:String,
    },
    country:{
          
        type:String
    },
    state:{
        type:String
    },
    city:{
        type:String
    }
    

   

    
},
{
    collection : 'User'
}
);


module.exports = mongoose.model('User',User)




