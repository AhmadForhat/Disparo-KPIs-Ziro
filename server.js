
const nodemailer = require('nodemailer');
const rp = require('request-promise-native');
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
        
        const enviarEmail = (number) => {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth:{
                    user: process.env.user,
                    pass: process.env.pass
                }
            });
            let array = []
            let charges = data.values[0]
        
            for (i = 0; i< charges.length; i++){
                array.push(`${data.values[0][i]}: ${data.values[number][i]}`);
            }
        
            console.log(array)
        
            // Options para mandar o e-mail
        
            let hoje = new Date()
            let month = hoje.getMonth()+1
        
            let mailOptions = {
                from: 'ahmadziroteste@gmail.com',
                to: data.values[number][0],
                subject: `KPIS ${data.values[number][1]} ${month}`,
                text: `Boa tarde ${data.values[number][1]}, suas KPIs do mês ${month} foram: ${array}`
            };
        
            transporter.sendMail(mailOptions, function(err,data){
                if(err){
                    console.log('Aconteceu um erro')
                }else{
                    console.log('Email foi enviado!')
                }
            })
        }

        enviarEmail(1)
        enviarEmail(2)

    } catch (error) {
        console.log(error)
    }
}

main()