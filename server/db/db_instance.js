const MongoClient = require('mongodb').MongoClient;

function returnCredentials(){
    let credentials
    try{
        credentials = require('./credentials.json')
    } catch {
        credentials = require('../credentials.json')
    }
    return credentials
}
const credentials = returnCredentials()

module.exports = new MongoClient(credentials.connectionString);