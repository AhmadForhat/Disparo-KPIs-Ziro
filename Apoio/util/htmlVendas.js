const constructorAssessor = require('./constructorAssessor')
const corDesempenho = require('./corDesempenho')

const html = (data) => {
    const dataMes = data.mes
    const descricaoMeta = data.desempenho
    const dataHoje = data.hoje
    const vendido2020 = data.venda2020
    const vendido2019 = data.venda2019
    const variacao = data.variacao
    const clientes2019 = data.clientes2019
    const clientes2020 = data.clientes2020
    const assessoresMes = data.assessores
    const assessoresDia = data.assessoreshoje
    return  `
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
                                    <p>${dataHoje}</p>
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
                                        <caption style="font-weight: bold; padding: 20px 0; margin: 0 0 20px; background: #222; color: #fff; text-transform: uppercase"><span style="color: #FFDD00; font-size: 20px">.&nbsp;</span>${dataMes} 2021 VS 2020<span style="color: #FFDD00; font-size: 20px">&nbsp;.</span></caption>
                                        <tbody>
                                            <tr>
                                                <td align="end" valign="top" style="padding-right: 20px"><b>Vendido 2021</b></td>
                                                <td align="start" valign="top" style="padding-left: 20px" width="50%">${vendido2020}</td>
                                            </tr>
                                            <tr>
                                                <td align="end" valign="top" style="padding-right: 20px"><b>Vendido 2020</b></td>
                                                <td align="start" valign="top" style="padding-left: 20px" width="50%">${vendido2019}</td>
                                            </tr>
                                            <tr>
                                                <td align="end" valign="top" style="padding-right: 20px"><b>Variação</b></td>
                                                <td align="start" valign="top" style="padding-left: 20px; font-weight: bold" width="50%">${variacao}</td>
                                            </tr>
                                            <tr>
                                                <td align="end" valign="top" style="padding-right: 20px"><b>Clientes 2021</b></td>
                                                <td align="start" valign="top" style="padding-left: 20px" width="50%">${clientes2020} atendidos</td>
                                            </tr>
                                            <tr>
                                                <td align="end" valign="top" style="padding-right: 20px"><b>Clientes 2020</b></td>
                                                <td align="start" valign="top" style="padding-left: 20px" width="50%">${clientes2019} atendidos</td>
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
                                            ${constructorAssessor(assessoresMes)}
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
                                            ${constructorAssessor(assessoresDia)}
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

module.exports = html