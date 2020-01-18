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
            "range": "main!A1:M2"
        },
        json: true
    }

    let optionsGoogleAssessorMes = {
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
            "range": "main!O2:R100"
        },
        json: true
    }
    let optionsGoogleAssessorDia = {
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
            "range": "main!S2:V100"
        },
        json: true
    }

    try {
        let data = await rp(optionsGoogle)
        let dataMes = await rp(optionsGoogleAssessorMes)
        let dataDia = await rp(optionsGoogleAssessorDia)
        let arrayEmail = (data.values[1][0]).split(",")
        const now = new Date();
        const hora = now.getUTCHours()
        const diaSemana = now.getDay()
        if(hora == 22 && diaSemana != 6 && diaSemana != 0){
        let i = arrayEmail.length
        let funcoesPromise = []
        while(i>0){
            i--
            funcoesPromise.push([enviarEmail(arrayEmail,i,data, dataMes, dataDia)])
        }
            Promise.all(funcoesPromise)
        }else{
            console.log('Horário ou data não disponível para disparo!')
        }
    } catch (error) {
        console.log(error)
    }
}

main()