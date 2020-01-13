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
            "range": "main!A1:F2"
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

        // Options para mandar o e-mail

        let hoje = new Date()
        let month = hoje.getMonth()+1

        let mailOptions = {
            from: 'ahmadziroteste@gmail.com',
            to: data.values[1][0],
            subject: `KPIS ${data.values[1][1]} ${month}`,
            text: `Boa tarde ${data.values[1][1]}, suas KPIs do mês ${month} foram: ${data.values[0][2]}: ${data.values[1][2]}, ${data.values[0][3]}: ${data.values[1][3]}, ${data.values[0][4]}: ${data.values[1][4]}, ${data.values[0][5]}: ${data.values[1][5]}`
        };

        // Operador para mandar

        transporter.sendMail(mailOptions, await function(err,data){
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