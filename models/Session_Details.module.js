
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/MentalHealth")

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
 
  name: {
    type: String,
    required: true
  },
  age: {type: Number,required: true},
  email: {
    type: String,
    required: true,
    unique: true
  },
  gender:{
    type:String,
    required:true,
    enum:[male,female]
  },
  dateTime: { type: Date, required: true },
  duration: { type: String , required: true },
  sessionStatus: { type: String, required: true, enum: ['scheduled', 'completed', 'canceled'] },
  patientFeedback: { type: String },

});


// Create and export the Mongoose model based on the schema
const SessionModel = mongoose.model('SessionModel', SessionSchema);

module.exports = SessionModel;
