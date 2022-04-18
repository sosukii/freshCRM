const express = require('express');
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', require('./routes'))
//app.use('/api/auth', require('./routes/auth.routes'))


async function start(){
    try{
        app.listen(5000,() => console.log(`♡ server started 5000`))
    }catch(e){
        console.log(e)
    }
}

module.exports = {start}