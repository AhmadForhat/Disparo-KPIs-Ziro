const nodemailer = require('nodemailer');

const enviarEmail = (number, data, dataMes, dataDia) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.user,
            pass: process.env.pass
        }
    });
    let constructorAssessorMes = ""
    let chargesMes = dataMes.values

    for (i = 0; i< chargesMes.length; i++){
        constructorAssessorMes += 
        `<tr>
        <td align="center" vertical-align="top">${dataMes.values[i][0]}</td>
        <td align="center" vertical-align="top">${dataMes.values[i][1]}</td>
        <td align="center" vertical-align="top">${dataMes.values[i][2]}</td>
        </tr>
        `
    }

    let constructorAssessorDia = ""
    let chargesDia = dataDia.values

    for (i = 0; i< chargesDia.length; i++){
        constructorAssessorDia += 
        `<tr>
        <td align="center" vertical-align="top">${dataDia.values[i][0]}</td>
        <td align="center" vertical-align="top">${dataDia.values[i][1]}</td>
        <td align="center" vertical-align="top">${dataDia.values[i][2]}</td>
        </tr>
        `
    }

    // Options para mandar o e-mail

    function convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()),pad(d.getMonth()+1),d.getFullYear()].join('/')
      }
    const date = new Date()
    const dateHoje = convertDate(date.setDate(date.getDate()))

    let mailOptions = {
        from: 'ahmadziroteste@gmail.com',
        to: data.values[number][0],
        subject: `KPI's ${data.values[number][1]}, ${dateHoje}`,
        html: 
            `
            <html lang="pt-br">
            <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">

            <title></title>

            <style type="text/css">
            </style>    
            </head>
            <body style="margin:0; padding:0; background-color:#F2F2F2;">
            <center>
                <table style="font-family: Arial" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
                    <tr>
                        <td align="center" vertical-align="top">
                            <table border="1" cellpadding="0" cellspacing="0" width="600px" id="emailContainer">
                                <tr>
                                    <td align="center" vertical-align="top">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" id="emailHeader">
                                            <tr>
                                                <td align="center" vertical-align="top">
                                                    <!-- THIS IS THE HEADER OF THE EMAIL -->
                                                    <div style="margin-bottom: 20px"></div>
                                                    <h2 style="display: inline; text-transform: uppercase; background: linear-gradient(transparent 60%, rgba(255,228,0,0.75) 100%)">ZIRO</h2>
                                                    <h3 style="text-transform: uppercase">Relatório Vendas</h3>
                                                    <p>24 de janeiro de 2020</p>
                                                    <div style="margin-bottom: 20px"></div>
                                                    <!-- END HEADER -->
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" vertical-align="top">
                                        <table border="0" cellpadding="0" cellspacing="0" width="600px" id="emailBody">
                                            <tr>
                                                <td align="center" vertical-align="top">
                                                    <!-- THIS IS THE BODY OF THE EMAIL -->
                                                    <table width="600px" align="center">
                                                        <h4 align="center" style="padding: 20px 0; background: #222; color: #fff; text-transform: uppercase"><span style="color: #FFDD00; font-size: 20px">.&nbsp;</span>Comparativo Janeiro 2020 - 2019<span style="color: #FFDD00; font-size: 20px">&nbsp;.</span></h4>
                                                        <tbody>
                                                            <tr>
                                                                <td align="end" vertical-align="top" style="padding-right: 20px"><b>Vendido 2020</b></td>
                                                                <td align="start" vertical-align="top" style="padding-left: 20px" width="50%">${data.values[number][3]}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="end" vertical-align="top" style="padding-right: 20px"><b>Vendido 2019</b></td>
                                                                <td align="start" vertical-align="top" style="padding-left: 20px" width="50%">${data.values[number][4]}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="end" vertical-align="top" style="padding-right: 20px"><b>Variação</b></td>
                                                                <td align="start" vertical-align="top" style="padding-left: 20px" width="50%">${data.values[number][5]}</td>
                                                            </tr>
                                                            <tr>
                                                                <td align="end" vertical-align="top" style="padding-right: 20px"><b>Desempenho</b></td>
                                                                <td align="start" vertical-align="top" style="padding-left: 20px" width="50%">${data.values[number][6]}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <table width="100%" align="center">
                                                        <h4 align="center" style="padding: 20px 0; background: #222; color: #fff; text-transform: uppercase"><span style="color: #FFDD00; font-size: 20px">.&nbsp;</span>Resultados acumulados<span style="color: #FFDD00; font-size: 20px">&nbsp;.</span></h4>
                                                        <thead>
                                                            <tr>
                                                                <th align="center" vertical-align="top">Assessor</th>
                                                                <th align="center" vertical-align="top">Vendido</th>
                                                                <th align="center" vertical-align="top">Clientes</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td align="center" vertical-align="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">${dataMes.values[0][3]}</td>
                                                                <td align="center" vertical-align="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">${dataMes.values[1][3]}</td>
                                                                <td align="center" vertical-align="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">${dataMes.values[2][3]}</td>
                                                            </tr>
                                                            ${constructorAssessorMes}
                                                        </tbody>
                                                    </table>
                                                    <table width="100%" align="center">
                                                        <h4 align="center" style="padding: 20px 0; background: #222; color: #fff; text-transform: uppercase"><span style="color: #FFDD00; font-size: 20px">.&nbsp;</span>Resultados do dia<span style="color: #FFDD00; font-size: 20px">&nbsp;.</span></h4>
                                                        <thead>
                                                            <tr>
                                                                <th align="center" vertical-align="top">Assessor</th>
                                                                <th align="center" vertical-align="top">Vendido</th>
                                                                <th align="center" vertical-align="top">Clientes</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td align="center" vertical-align="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">${dataDia.values[0][3]}</td>
                                                                <td align="center" vertical-align="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">${dataDia.values[1][3]}</td>
                                                                <td align="center" vertical-align="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">${dataDia.values[2][3]}</td>
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
                                    <td align="center" vertical-align="top">
                                        <table border="0" cellpadding="20" cellspacing="0" width="100%" id="emailFooter">
                                            <tr>
                                                <td align="center" vertical-align="top">
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
            </center>
            </body>
            </html>
        `
    };

    transporter.sendMail(mailOptions, function(err,data){
        if(err){
            console.log("Deu erro", err)
        }else{
            console.log("Enviado com sucesso!")
        }
    })
}

module.exports = enviarEmail