const nodemailer = require('nodemailer');

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

module.exports = enviarEmail