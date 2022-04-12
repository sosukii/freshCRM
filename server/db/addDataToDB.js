const mongoose = require('mongoose');
const db = require('./db_instance')
const usersData = require('./dataForDB/users.json')
const rolesData = require('./dataForDB/roles.json')
const contractsData = require('./dataForDB/contracts.json')
const workActivitysData = require('./dataForDB/workactivities.json')

function returnValidData(jsonData){
    const data = jsonData.map(doc => {
        doc._id = mongoose.Types.ObjectId(doc._id.$oid)
        return doc
    })
    return data
}
async function addDataIfNotExist(dbName = "myprettydb", collectionName, data){
    db.connect(async function(err, client) {
        if(err) throw err
    
        const db = client.db(dbName);
    
        const isDocsExist = await db.collection(collectionName).countDocuments()
        if(isDocsExist) console.log('docs exist')
        else {
            console.log('docs not exist')
            try{
                db.collection(collectionName).insertMany(data, (err, result)=>{
                    if (err) throw err
                    console.log('result: ', result);
                })
            } catch(err){
                console.log(err);
            }
        }
    });
}

async function addDataByCollection(jsonData, collectionName){
    const currentData = returnValidData(jsonData)
    await addDataIfNotExist(dbName = "myprettydb", collectionName, currentData)
}

function startAddingProccess(){
    addDataByCollection(usersData, 'users')
    addDataByCollection(rolesData, 'roles')
    addDataByCollection(contractsData, 'contracts')
    addDataByCollection(workActivitysData, 'workactivities')
}

module.exports = {startAddingProccess}