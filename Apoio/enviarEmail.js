const nodemailer = require('nodemailer');

const enviarEmail = (number, data) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.user,
            pass: process.env.pass
        }
    });
    let array = []
    let constructorHtml = ""
    let charges = data.values[0]

    for (i = 0; i< charges.length; i++){
        constructorHtml += `<li><h3>${data.values[0][i]}</h3> ${data.values[number][i]}</li>`
    }

    // Options para mandar o e-mail

    let hoje = new Date()
    let month = hoje.getMonth()+1
    let year = hoje.getFullYear()

    let mailOptions = {
        from: 'ahmadziroteste@gmail.com',
        to: data.values[number][0],
        subject: `KPI's ${data.values[number][1]}, ${hoje}`,
        html: `<h2>KPI's de venda do dia ${hoje}</h2><ul>${constructorHtml}</ul><style>color:red</style>`
    };

    transporter.sendMail(mailOptions, function(err,data){
        if(err){
            console.log('Aconteceu um erro')
        }else{
            console.log('Email foi enviado!')
        }
    })
}

module.exports = enviarEmail