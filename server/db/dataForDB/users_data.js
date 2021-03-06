const mongoose = require('mongoose');

function returnValidObjectId(string){
  return mongoose.Types.ObjectId(string)
}

const data = [{
    "_id": returnValidObjectId("619bba5e84ef6707683b3af7"),
    "car": [],
    "roles": ["USER"],
    "email": "bonbon@mail.ru",
    "password": "$2a$07$7Nkl8e/CUfY.bW0FMWpgt.NfCT2AUEeisp5Nb4I.G6qxGPbUVu44a",
    "name": "Ron",
    "phone": "85557774422",
    "job": "student",
    "payment": [],
    "__v": 8,
    "paymentPerHour": 200,
    "workTime": []
  },{
    "_id": returnValidObjectId("619bbb447a587db385e332bb"),
    "car": [],
    "roles": ["USER"],
    "email": "germi@mail.ru",
    "password": "$2a$07$mhiLTK9zQ/qhA679FFfkf.z8YOqEcRehXv5WpWxCUtI20FPPjtGXS",
    "name": "girmiona",
    "phone": "85556669933",
    "job": "student",
    "workTime": [
      returnValidObjectId("61b0653aff3637b74d0c6749")
    ],
    "__v": 0,
    "paymentPerHour": 250
  },{
    "_id": returnValidObjectId("619ea47a40be749fe1c9a0cf"),
    "car": [],
    "roles": ["USER"],
    "email": "papi@mail.ru",
    "password": "$2a$07$6zrxHnwg2rdQcDC5WNz8IOAV0S2CErrkdSQS0ltMlUBJ12AreX3du",
    "name": "Pavel",
    "phone": "85552224499",
    "job": "Director",
    "workTime": [
      returnValidObjectId("61ad238fe7c62f23d43b02f2"),
      returnValidObjectId("61b00114294e3602dbfdc71d")
    ],
    "__v": 1,
    "paymentPerHour": 320
  },{
    "_id": returnValidObjectId("619ea53e40be749fe1c9a0dd"),
    "car": [],
    "roles": ["ADMIN"],
    "email": "sanya@mail.ru",
    "password": "$2a$07$Agi0ostPsG/clxyhpV8gO.XEX4LTQjOn4A4GKHrqxlKKF9XYxMUnK",
    "name": "Alexander",
    "phone": "87774442233",
    "job": "manager",
    "workTime": [
      returnValidObjectId("61ad238fe7c62f23d43b02f5")
    ],
    "__v": 0,
    "paymentPerHour": 150
  },{
    "_id": returnValidObjectId("619ea56340be749fe1c9a0e0"),
    "car": [],
    "roles": ["USER"],
    "email": "test@mail.ru",
    "password": "$2a$07$vCZn922kd91bGBoFBZ7G5OWmwftX0YPfkjar6JtUexDJ7pwYNbo16",
    "name": "TestName",
    "phone": "89995552288",
    "job": "testirovshic",
    "workTime": [
      returnValidObjectId("61f5556ae520bc28d6cf4168")
    ],
    "__v": 1,
    "paymentPerHour": 300
  },{
    "_id": returnValidObjectId("61b2c27be79ba52d02001697"),
    "car": [],
    "roles": ["USER"],
    "email": "roleTest@mail.ru",
    "password": "$2a$07$TtIoLSICT6z6i9H5MDrfcOB3efwvjGjHc5oUPF3Atznb0ZofG7/pu",
    "name": "RoleTest_name",
    "phone": "87774440099",
    "job": "roleTester",
    "workTime": [],
    "__v": 0
  },{
    "_id": returnValidObjectId("61b2c56a8d84c6878eb833d9"),
    "car": [],
    "roles": ["ADMIN"],
    "email": "adminTest@mail.ru",
    "password": "$2a$07$kwukDUVbhTyYUC.XrV2siu8jxIe6PTdX4YKd2.Db2rB.Ck0GVN08K",
    "name": "adminTest_name",
    "phone": "85552220077",
    "job": "adminTester",
    "workTime": [],
    "__v": 0
  },{
    "_id": returnValidObjectId("6207c21bab27202d82137b75"),
    "car": [],
    "workTime": [],
    "name": "sasuke",
    "email": "sosukii@mail.ru",
    "password": "123456",
    "__v": 0
  },{
    "_id": returnValidObjectId("6208003a596a95da41cac242"),
    "car": [],
    "workTime": [],
    "name": "naruto",
    "email": "naruto@mail.ru",
    "password": "1212",
    "__v": 0
  },{
    "_id": returnValidObjectId("62084082db952ab47577fab8"),
    "car": [],
    "workTime": [],
    "name": "ad",
    "email": "asd",
    "password": "asd",
    "__v": 0
  },{
    "_id": returnValidObjectId("620840e0db952ab47577fabb"),
    "car": [],
    "workTime": [],
    "name": "vvvvv",
    "email": "vv",
    "password": "v",
    "__v": 0
  },{
    "_id": returnValidObjectId("620840fb32d3fc2c48b29c2a"),
    "car": [],
    "workTime": [],
    "name": "as",
    "email": "ass",
    "password": "asss",
    "__v": 0
  },{
    "_id": returnValidObjectId("6208491d32d3fc2c48b29c2d"),
    "car": [],
    "workTime": [],
    "name": "rabbit",
    "email": "rabbit@mail.ru",
    "password": "123456",
    "__v": 0
  },{
    "_id": returnValidObjectId("620849a332d3fc2c48b29c4a"),
    "car": [],
    "workTime": [],
    "name": "san",
    "email": "sanb222",
    "password": "123456",
    "__v": 0
  }]

module.exports = data