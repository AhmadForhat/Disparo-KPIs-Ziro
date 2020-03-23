const nodemailer = require('nodemailer')

const enviarEmail = async (arrayEmail, number, data,corpoEmail,titulo) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.user,
            pass: process.env.pdw
        }
    })

    // Options para mandar o e-mail
    let diaDeHoje = data[0].hoje
    const mailOptions = {
        from: 'relatorios.ziro@gmail.com',
        to: arrayEmail[number],
        subject: `${titulo} ${diaDeHoje}`,
        html:corpoEmail
    }
    return new Promise((resolve,reject)=>{
        transporter.sendMail(mailOptions, function(err,data){
            if(err){
                if(err.response){
                    reject(err.response)
                }else if(err.code === 'ESOCKET'){
                    reject(err.code)
                    console.log(err.code, 'Erro ao conectar ao servidor, verifique se os parâmetros no options estão corretos')
                }
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

module.exports = enviarEmail