const mongoose = require('mongoose');

function returnValidObjectId(string){
  return mongoose.Types.ObjectId(string)
}
function returnValidDate(string){
  return new Date(string)
}

const data = [{
    "_id": returnValidObjectId("61ad238fe7c62f23d43b02ef"),
    "workers": [
      returnValidObjectId("619ea47a40be749fe1c9a0cf"),
      returnValidObjectId("619ea53e40be749fe1c9a0dd")
    ],
    "company": "TestDogovor",
    "contactFace": "Testov Test",
    "address": "Testovaya 23",
    "totalSum": "420000",
    "phone": "89994442200",
    "additional": "позвонить за 2 часа до выезда!",
    "start": returnValidDate("2021-12-02T00:00:00Z"),
    "__v": 0
  },{
    "_id": returnValidObjectId("61b00113294e3602dbfdc716"),
    "workers": [
      returnValidObjectId("619ea47a40be749fe1c9a0cf"),
      returnValidObjectId("619bbb447a587db385e332bb"),
      returnValidObjectId("619ea56340be749fe1c9a0e0")
    ],
    "company": "ГазСервис",
    "contactFace": "Ковец Степан Сергеевич",
    "address": "Санкт Петербург г., Малая Бронная ул., 2б",
    "totalSum": "50000",
    "phone": "89994997861",
    "additional": "без предоплаты",
    "start": returnValidDate("2021-12-01T00:00:00Z"),
    "__v": 0
}]
  
module.exports = data