// const mon = require("mongoose")
// require('dotenv').config();

// async function connectDB() {
//     try {
//         await mon.connect(process.env.URI)
//         console.log("MongoDB Connected Succesfully");

//     } catch (error) {
//         console.error("ERror connecting to mongodb ",error.message);
//         process.exit(1)
//     }
// }
// export default {connectDB}

const mon = require('mongoose');
require('dotenv').config();

async function connectDB() {
  try {
    await mon.connect(process.env.URI);
    console.log('MongoDB Connected Succesfully');
  } catch (error) {
    console.error('ERror connecting to mongodb ', error.message);
    process.exit(1);
  }
}
//not above one as we're using commonJS
module.exports = connectDB;
