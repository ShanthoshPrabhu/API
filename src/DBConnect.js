const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const uri = process.env.MONGO_URI;
var exports=module.exports={};


exports.connectDB=async function(){
  try {
    await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(()=>{
      console.log(`Mongodb connected `);
    })
  } catch (error) {
    console.log(`Inside dbConnecter - Error : ${error.message}`);
  }
};