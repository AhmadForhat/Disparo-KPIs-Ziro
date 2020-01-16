const nodemailer = require('nodemailer');

const enviarEmail = (arrayEmail, number, data, dataMes, dataDia) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.user,
            pass: process.env.pass
        }
    });
    function corDesempenho(data){
        if(data.values[1][6] = "Abaixo da meta x2"){
            return "color: #881600"
        }if(data.values[1][6] = "Abaixo da Meta x2,5"){
            return "color: #E53A40"
        }if(data.values[1][6] = "Abaixo da Meta x3"){
            return "color: #FFBC42"
        }if(data.values[1][6] = "Meta atingida"){
            return "color: #5A9367"
        }else{
            return "color: black"
        }
    }

    let constructorAssessorMes = ""
    let chargesMes = dataMes.values

    for (i = 1; i< chargesMes.length; i++){
        constructorAssessorMes += 
        `<tr>
        <td align="center" valign="top">${dataMes.values[i][0]}</td>
        <td align="center" valign="top">${dataMes.values[i][1]}</td>
        <td align="center" valign="top">${dataMes.values[i][2]}</td>
        </tr>
        `
    }

    let constructorAssessorDia = ""
    let chargesDia = dataDia.values

    for (i = 1; i< chargesDia.length; i++){
        constructorAssessorDia += 
        `<tr>
        <td align="center" valign="top">${dataDia.values[i][0]}</td>
        <td align="center" valign="top">${dataDia.values[i][1]}</td>
        <td align="center" valign="top">${dataDia.values[i][2]}</td>
        </tr>
        `
    }

    // Options para mandar o e-mail

    let mailOptions = {
        from: 'ahmadziroteste@gmail.com',
        to: arrayEmail[number],
        subject: `VENDAS ${data.values[1][1]}`,
        html: 
            `
            <table style="font-family: Arial" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
            <tr>
                <td align="center" valign="top">
                    <table style="max-width: 800px" border="1" cellpadding="0" cellspacing="0" width="100%" id="emailContainer">
                        <tr>
                            <td align="center" valign="top">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" id="emailHeader">
                                    <tr>
                                        <td align="center" valign="top">
                                            <!-- THIS IS THE HEADER OF THE EMAIL -->
                                            <div style="margin-bottom: 20px"></div>
                                            <h2 style="display: inline; text-transform: uppercase; background: linear-gradient(transparent 60%, rgba(255,228,0,0.75) 100%)">ZIRO</h2>
                                            <h3 style="text-transform: uppercase">Relatório Vendas</h3>
                                            <p>${data.values[1][1]}</p>
                                            <div style="margin-bottom: 20px"></div>
                                            <!-- END HEADER -->
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" valign="top">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" id="emailBody">
                                    <tr>
                                        <td align="center" valign="top">
                                            <!-- THIS IS THE BODY OF THE EMAIL -->
                                            <table width="100%" cellpadding="2">
                                                <caption style="font-weight: bold; padding: 20px 0; margin: 0 0 20px; background: #222; color: #fff; text-transform: uppercase"><span style="color: #FFDD00; font-size: 20px">.&nbsp;</span>Janeiro 2020 VS 2019<span style="color: #FFDD00; font-size: 20px">&nbsp;.</span></caption>
                                                <tbody>
                                                    <tr>
                                                        <td align="end" valign="top" style="padding-right: 20px"><b>Vendido 2020</b></td>
                                                        <td align="start" valign="top" style="padding-left: 20px" width="50%">${data.values[1][3]}</td>
                                                    </tr>
                                                    <tr>
                                                        <td align="end" valign="top" style="padding-right: 20px"><b>Vendido 2019</b></td>
                                                        <td align="start" valign="top" style="padding-left: 20px" width="50%">${data.values[1][4]}</td>
                                                    </tr>
                                                    <tr>
                                                        <td align="end" valign="top" style="padding-right: 20px"><b>Variação</b></td>
                                                        <td align="start" valign="top" style="padding-left: 20px" width="50%">${data.values[1][5]}</td>
                                                    </tr>
                                                    <tr>
                                                        <td align="end" valign="top" style="padding-right: 20px"><b>Desempenho</b></td>
                                                        <td align="start" valign="top" style="padding-left: 20px; font-weight: bold; ${corDesempenho(data)}" width="50%">${data.values[1][6]}</td>
                                                    </tr>
                                                    <tr>
                                                        <td align="end" valign="top" style="padding-right: 20px"><b>Clientes 2020</b></td>
                                                        <td align="start" valign="top" style="padding-left: 20px" width="50%">${data.values[1][7]}</td>
                                                    </tr>
                                                    <tr>
                                                        <td align="end" valign="top" style="padding-right: 20px"><b>Clientes 2019</b></td>
                                                        <td align="start" valign="top" style="padding-left: 20px" width="50%">${data.values[1][8]}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table width="100%" cellpadding="2">
                                                <caption style="font-weight: bold; padding: 20px 0; margin: 20px 0; background: #222; color: #fff; text-transform: uppercase"><span style="color: #FFDD00; font-size: 20px">.&nbsp;</span>Resultados acumulados<span style="color: #FFDD00; font-size: 20px">&nbsp;.</span></caption>
                                                <thead>
                                                    <tr>
                                                        <th align="center" valign="top">Assessor</th>
                                                        <th align="center" valign="top">Vendido</th>
                                                        <th align="center" valign="top">Clientes</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td align="center" valign="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">${dataMes.values[1][3]}</td>
                                                        <td align="center" valign="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">${dataMes.values[2][3]}</td>
                                                        <td align="center" valign="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">${dataMes.values[3][3]}</td>
                                                    </tr>
                                                    ${constructorAssessorMes}
                                                </tbody>
                                            </table>
                                            <table width="100%" cellpadding="2">
                                                <caption style="font-weight: bold; padding: 20px 0; margin: 20px 0; background: #222; color: #fff; text-transform: uppercase"><span style="color: #FFDD00; font-size: 20px">.&nbsp;</span>Resultados do dia<span style="color: #FFDD00; font-size: 20px">&nbsp;.</span></caption>
                                                <thead>
                                                    <tr>
                                                        <th align="center" valign="top">Assessor</th>
                                                        <th align="center" valign="top">Vendido</th>
                                                        <th align="center" valign="top">Clientes</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td align="center" valign="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">${dataDia.values[1][3]}</td>
                                                        <td align="center" valign="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">${dataDia.values[2][3]}</td>
                                                        <td align="center" valign="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">${dataDia.values[3][3]}</td>
                                                    </tr>
                                                    ${constructorAssessorDia}
                                                </tbody>
                                            </table>
                                            <div style="margin-bottom: 20px"></div>
                                            <!-- END BODY -->
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td align="center" valign="top">
                                <table border="0" cellpadding="20" cellspacing="0" width="100%" id="emailFooter">
                                    <tr>
                                        <td align="center" valign="top">
                                            <!-- THIS IS THE FOOTER OF THE EMAIL -->
                                            <q>Do or do not. There is no try.</q>
                                            <!-- END FOOTER -->
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        `
    }
    const transporterPromise = (mailOptions) => {
        return new Promise((resolve,reject)=>{
            transporter.sendMail(mailOptions, function(err,data){
                if(err){
                    console.log("Deu erro", err)
                }else{
                    resolve(data)
                    console.log("Enviado com sucesso!")
                }
            })
        })
    }
    transporterPromise(mailOptions)
    .then(data => console.log("Email enviado com sucesso!", data))
    .catch(err => console.log(err))
}

module.exports = enviarEmail