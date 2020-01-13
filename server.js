
const nodemailer = require('nodemailer');
var rp = require('request-promise-native');
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
            "range": "main!A1:F3"
        },
        json: true
    }

    try {
        let data = await rp(optionsGoogle)
        console.log(data)
        // Transporter

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.user,
                pass: process.env.pass
            }
        });

        let arrayMud = []
        let arrayBruno = []
        let charges = data.values[0]
    
        for (i = 0; i< charges.length; i++){
            arrayMud.push(`${data.values[0][i]}: ${data.values[1][i]}`);
        }

        for (i = 0; i< charges.length; i++){
            arrayBruno.push(`${data.values[0][i]}: ${data.values[2][i]}`);
        }

        console.log(arrayBruno)
        console.log(arrayMud)

        // Options para mandar o e-mail

        let hoje = new Date()
        let month = hoje.getMonth()+1

        let mailOptionsBruno = {
            from: 'ahmadziroteste@gmail.com',
            to: data.values[2][0],
            subject: `KPIS ${data.values[2][1]} ${month}`,
            text: `Boa tarde ${data.values[2][1]}, suas KPIs do mês ${month} foram: ${arrayBruno}`
        };

        transporter.sendMail(mailOptionsBruno, await function(err,data){
            if(err){
                console.log('Aconteceu um erro')
            }else{
                console.log('Email foi enviado!')
            }
        })

        let mailOptionsMud = {
            from: 'ahmadziroteste@gmail.com',
            to: data.values[1][0],
            subject: `KPIS ${data.values[1][1]} ${month}`,
            text: `Boa tarde ${data.values[1][1]}, suas KPIs do mês ${month} foram: ${arrayMud}`
        };

        // Operador para mandar

        transporter.sendMail(mailOptionsMud, await function(err,data){
            if(err){
                console.log('Aconteceu um erro')
            }else{
                console.log('Email foi enviado!')
            }
        })
    } catch (error) {
        console.log(error)
    }
}

main()