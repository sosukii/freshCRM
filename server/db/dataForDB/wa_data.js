const mongoose = require('mongoose');

function returnValidObjectId(string){
  return mongoose.Types.ObjectId(string)
}
function returnValidDate(string){
  return new Date(string)
}

const data = [{
    "_id": returnValidObjectId("61ad238fe7c62f23d43b02f2"),
    "dogovor_id": returnValidObjectId("61ad238fe7c62f23d43b02ef"),
    "dogovor_date": returnValidDate("2021-12-02T00:00:00Z"),
    "worker_id": returnValidObjectId("619ea47a40be749fe1c9a0cf"),
    "hours": 12,
    "tips": 3840,
    "__v": 0,
    "worker_name": "Pavel"
  },{
    "_id": returnValidObjectId("61ad238fe7c62f23d43b02f5"),
    "dogovor_id": returnValidObjectId("61ad238fe7c62f23d43b02ef"),
    "dogovor_date": returnValidDate("2021-12-02T00:00:00Z"),
    "worker_id": returnValidObjectId("619ea53e40be749fe1c9a0dd"),
    "hours": 14,
    "tips": 2100,
    "__v": 0,
    "worker_name": "Alexander"
  },{
    "_id": returnValidObjectId("61b00114294e3602dbfdc71d"),
    "dogovor_id": returnValidObjectId("61b00113294e3602dbfdc716"),
    "dogovor_date": returnValidDate("2021-12-01T00:00:00Z"),
    "worker_id": returnValidObjectId("619ea47a40be749fe1c9a0cf"),
    "hours": 8,
    "tips": 2560,
    "__v": 0,
    "worker_name": "Pavel"
  },{
    "_id": returnValidObjectId("61b0653aff3637b74d0c6749"),
    "dogovor_id": returnValidObjectId("61b00113294e3602dbfdc716"),
    "dogovor_date": returnValidDate("2021-12-01T00:00:00Z"),
    "worker_id": returnValidObjectId("619bbb447a587db385e332bb"),
    "worker_name": "girmiona",
    "hours": 10,
    "tips": 2500,
    "__v": 0
  },{
    "_id": returnValidObjectId("61f5556ae520bc28d6cf4168"),
    "dogovor_id": returnValidObjectId("61b00113294e3602dbfdc716"),
    "dogovor_date": returnValidDate("2021-12-01T00:00:00Z"),
    "worker_id": returnValidObjectId("619ea56340be749fe1c9a0e0"),
    "worker_name": "TestName",
    "hours": 8,
    "tips": 2400,
    "__v": 0
}]

module.exports = data