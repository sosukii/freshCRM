const server = require('./server_instance')
const data = require('./db/addDataToDB')
const db = require("./db/db_instance")

async function start(){
    await server.start()
    await db.connect()
    await data.add()
    
}
start()