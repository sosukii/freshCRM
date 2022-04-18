const { question } = require('readline-sync');
const { existsSync, unlinkSync, writeFileSync } = require('fs');

if(existsSync('./credentials.json')) {
    console.log('credentials.json already exist. the old file be deleted.')
    unlinkSync('./credentials.json', (err) => {
        if (err) throw err;
    })
}

const connectionToMongoString = question(`Enter you're mongo connection string with db name (for example: mongodb+srv://Alexey555:myAwesomePassword777@cluster0.zaaoe.mongodb.net/myprettydb): `)

if(connectionToMongoString) {
    const authData = {
        "connectionString":connectionToMongoString
    }

    writeFileSync('./credentials.json', JSON.stringify(authData), err => {
        console.log('creating credentials.json error: ', err)
    })
    console.log('♡ credentials.json successfully created!')
} else{
    console.log(`Wrong connection string. Please try again.`);
}