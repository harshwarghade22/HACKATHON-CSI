
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/MentalHealth")
// const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;



const UserModelSchema = new Schema({
 
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
  password :{
    type : String , 
    required : true
  },
  gender:{
    type : String,
    
  }

});


UserModelSchema.pre("save" , async function(next){
  this.password = await bcrypt.hash(this.password , 5)
})



UserModelSchema.methods.getJWTToken = function () {
  // Convert _id to string
  const userId = this._id.toString();
  // Sign JWT token using the stringified _id
  return jwt.sign({ id: userId }, "wlrng;ksfb kfvj sfugbRWUOBVOSV", {
    expiresIn: 10000 * 24 * 60 * 60 * 60 
  });
}


UserModelSchema.methods.comparePassword = async function(enteredPass){
  return await bcrypt.compare(enteredPass , this.password);
}
//UserModelSchema.plugin(require(passportLocalMongoose));
// Create and export the Mongoose model based on the schema
const UserModel = mongoose.model('UserModel', UserModelSchema);

module.exports = UserModel;
