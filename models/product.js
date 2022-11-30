const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    title:{type:String,required:true,unique:true},
    desc:{type:String,required:true },
    price:{type:Number,required:true},
    img:{type:String,required:true}
},
  {timestamps:true}  
)

module.exports = mongoose.model('products',productsSchema)