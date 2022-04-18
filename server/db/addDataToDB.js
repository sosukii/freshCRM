const User = require("./models/User")
const Role = require("./models/Role")
const Contract = require("./models/Contract")
const WorkActivity = require("./models/workActivity")

const usersData = require("./dataForDB/users_data")
const rolesData = require("./dataForDB/roles_data")
const contractsData = require("./dataForDB/contracts_data")
const workActivitysData = require("./dataForDB/wa_data")

async function addDocsByCollection(collection, data){
    await collection.insertMany(data)
}
function errorHandler(error){
    error.code === 11000
    ? console.log('data exist')
    : console.log('adding denied');
}
async function addDocsToUsersCollection(){
    try{
        await addDocsByCollection(User, usersData);
        console.log('♡ Users added');
    } catch(e){
        errorHandler(e)
    }
}
async function addDocsToRolesCollection(){
    try{
        await addDocsByCollection(Role, rolesData);
        console.log('♡ Roles added');
    } catch(e){
        errorHandler(e)
    }
}
async function addDocsToContractsCollection(){
    try{
        await addDocsByCollection(Contract, contractsData);
        console.log('♡ Contracts added');
    } catch(e){
        errorHandler(e)
    }
}
async function addDocsToWorkActivityCollection(){
    try{
        await addDocsByCollection(WorkActivity, workActivitysData);
        console.log('♡ WorkActivity added');
    } catch(e){
        errorHandler(e)
    }
}



async function add(){
    await addDocsToUsersCollection()
    await addDocsToRolesCollection()
    await addDocsToContractsCollection()
    await addDocsToWorkActivityCollection()
}
//add()

module.exports = {add}