const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const ConnectionDB = (uri) => {
   return mongoose.connect(uri, {useNewUrlParser: true}, console.log("success connect to db " + uri));
}

module.exports = ConnectionDB;