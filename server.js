const rp = require('request-promise-native');
const enviarEmail = require('./Apoio/enviarEmail')
require('dotenv').config()

//GoogleSheets GET

async function main(){

    const url = "https://sheets.ziro.app/.netlify/functions/api"
    const username = process.env.userSheets
    const password = process.env.pdwSheets
    const auth = "Basic " + new Buffer.from(username + ":" + password).toString("base64");

    let optionsGoogle = {
        method: "GET",
        url:url,
        headers: {
            "Origin": "https://ziro.app",
            "Content-type": "application/json",
            "Authorization": auth
        },
        body : {
            "apiResource": "values",
            "apiMethod": "get",
            "spreadsheetId": process.env.sheetsId,
            "range": "main!A1:Q3"
        },
        json: true
    }

    try {
        let data = await rp(optionsGoogle)
        
        enviarEmail(1,data)

    } catch (error) {
        console.log(error)
    }
}

main()