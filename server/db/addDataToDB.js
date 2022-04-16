const db = require('./db_instance')

const User = require("./models/User")
const Role = require("./models/Role")
const Contract = require("./models/Contract")
const WorkActivity = require("./models/workActivity")

const usersData = require("./dataForDB/users_data")
const rolesData = require("./dataForDB/roles_data")
const contractsData = require("./dataForDB/contracts_data")
const workActivitysData = require("./dataForDB/wa_data")

async function isDocsExistIn(collection){
    const docs = await collection.find({}) 
    return (docs.length > 0)
}
async function addDocsToCollection(collection, docs){
    if(!await isDocsExistIn(collection)){
        for(let doc of docs){
            const instance = new collection(doc)

            await instance.save(err => {
                if(err) throw err
            })
        }
    } else{
        console.log('♡ docs exist')
    }
}

// db.connect()
function add(){
    addDocsToCollection(User, usersData) 
    addDocsToCollection(Role, rolesData) 
    addDocsToCollection(Contract, contractsData) 
    addDocsToCollection(WorkActivity, workActivitysData)
}

module.exports = {add}