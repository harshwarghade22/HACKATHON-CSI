const mongoose = require('mongoose');
const { type } = require('os');
mongoose.connect("mongodb://127.0.0.1:27017/MentalHealth")

const Schema = mongoose.Schema;

const Patient_Schema = new Schema({
 
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  risk:{
    type:Number,
  },
  password:{
    type: String , required :true
  },
  medicalHistory:[{
    
    disease:{
      type: String , 
    } , 
    year :{
      type : String 
    },
    doctor : {
      name:{
        type:String , 
      },
      Location :{
        type : String
      }
    }

  }]

});


// Create and export the Mongoose model based on the schema
const PatientModel = mongoose.model('PatientModel', Patient_Schema);

module.exports = PatientModel;