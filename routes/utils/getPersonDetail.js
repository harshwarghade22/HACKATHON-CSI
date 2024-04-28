const jwt = require("jsonwebtoken")

exports.getPersonDetail = async function (req , res , next){
  const { token } = req.cookie

        const decodedData = await jwt.verify(token, "wlrng;ksfb kfvj sfugbRWUOBVOSV");

        return decodedData;
}

