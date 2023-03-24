const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

let Invoice = new Schema({
    InvoiceNo:{
      type:String
    },
    Date:{
       type:String
    },
    Mobilenumber:{
       type:Number
    },
    Status:{
        type:String
    },
   
    country:{
          
        type:String
    },
    state:{
        type:String
    },
    city:{
        type:String
    },
    
},
{
    collection : 'Invoice'
}
)

module.exports = mongoose.model('Invoice',Invoice)