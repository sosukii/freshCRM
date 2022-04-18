const mongoose = require('mongoose');

function returnValidObjectId(string){
  return mongoose.Types.ObjectId(string)
}

const data = [{
    "_id": returnValidObjectId("61b18d92caaff8516dc619ed"),
    "value": "USER",
    "__v": 0
  },{
    "_id": returnValidObjectId("61b18d92caaff8516dc619ee"),
    "value": "ADMIN",
    "__v": 0
}]

module.exports = data 