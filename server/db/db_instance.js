const mongoose = require('mongoose')

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

function connect(){
    try{
        mongoose.connect(
            credentials.connectionString,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },()=>{
                console.log('♡ db has been connected')
            }
        )
    } catch(e){
        console.log(e)
    }
}

module.exports = {connect}