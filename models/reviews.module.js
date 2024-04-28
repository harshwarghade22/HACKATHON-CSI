const mongoose = require('mongoose');
const { type } = require('os');
mongoose.connect("mongodb://127.0.0.1:27017/MentalHealth")


const Schema = mongoose.Schema;

const ReviewSchema = new Schema ({

  name :{
    type : String 
  } , 
  email:{
    type: String,
  } ,
  description:{
    type:String,
  },
  rating:{ 
    type : Number
  }

})

const ReviewModel = mongoose.model("ReviewSchema" , ReviewSchema);
module.exports = ReviewModel;