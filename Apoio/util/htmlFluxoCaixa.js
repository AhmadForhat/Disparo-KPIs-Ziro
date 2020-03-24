const constructorFluxoFuturo = require('./constructorFluxoFuturo')
const constructorDespesas = require('./constructorDespesas')

const html = (data) => {
    const dataHoje = data.hoje
    const saldoHojeCedo = data.saldoHojeCedo
    const saldoHojeTarde = data.saldoHojeTarde
    const saldoHojeBalanco = data.saldoBalanco
    const arraySaldoHojeCedo = saldoHojeCedo.split('#')
    const arraySaldoHojeTarde = saldoHojeTarde.split('#')
    const arraySaldoBalanco = saldoHojeBalanco.split('#')
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
                                    <h3 style="text-transform: uppercase">Relatório Fluxo de Caixa</h3>
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
                    <!-- Inicio saldo de hoje -->
                                    <table width="100%" cellpadding="2">
                                        <caption style="font-weight: bold; padding: 20px 0; margin: 20px 0; background: #222; color: #fff; text-transform: uppercase"><span style="color: #FFDD00; font-size: 20px">.&nbsp;</span>Saldos de hoje<span style="color: #FFDD00; font-size: 20px">&nbsp;.</span></caption>
                                        <thead>
                                            <tr>
                                                <th align="center" valign="top">Período</th>
                                                <th align="center" valign="top">Saldo Caixa Int.</th>
                                                <th align="center" valign="top">Saldo Inter</th>
                                                <th align="center" valign="top">Saldo Aporte</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                            <td align="center" valign="top">Manhã</td>
                                            <td align="center" valign="top">${arraySaldoHojeCedo[0]}</td>
                                            <td align="center" valign="top">${arraySaldoHojeCedo[2]}</td>
                                            <td align="center" valign="top">${arraySaldoHojeCedo[3]}</td>
                                            </tr>
                                            <tr>
                                            <td align="center" valign="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">Tarde</td>
                                            <td align="center" valign="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">${arraySaldoHojeTarde[0]}</td>
                                            <td align="center" valign="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">${arraySaldoHojeTarde[2]}</td>
                                            <td align="center" valign="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">${arraySaldoHojeTarde[3]}</td>
                                            </tr>
                                            <tr>
                                            <td align="center" valign="top">Balanço</td>
                                            <td align="center" valign="top">${arraySaldoBalanco[0]}</td>
                                            <td align="center" valign="top">${arraySaldoBalanco[2]}</td>
                                            <td align="center" valign="top">${arraySaldoBalanco[3]}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- Inicio saldo futuro -->
                                    <table width="100%" cellpadding="2">
                                        <caption style="font-weight: bold; padding: 20px 0; margin: 20px 0; background: #222; color: #fff; text-transform: uppercase"><span style="color: #FFDD00; font-size: 20px">.&nbsp;</span>Saldo Futuro<span style="color: #FFDD00; font-size: 20px">&nbsp;.</span></caption>
                                        <thead>
                                            <tr>
                                                <th align="center" valign="top">Data</th>
                                                <th align="center" valign="top">Saldo Caixa Int.</th>
                                                <th align="center" valign="top">Saldo Inter</th>
                                                <th align="center" valign="top">Saldo Aporte</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        ${constructorFluxoFuturo(data.fluxoFuturo)}
                                        </tbody>
                                    </table>
                                    <table width="100%" cellpadding="2">
                                    <caption style="font-weight: bold; padding: 20px 0; margin: 20px 0; background: #222; color: #fff; text-transform: uppercase"><span style="color: #FFDD00; font-size: 20px">.&nbsp;</span>Despesas de Hoje<span style="color: #FFDD00; font-size: 20px">&nbsp;.</span></caption>
                                    <thead>
                                        <tr>
                                            <th align="center" valign="top">Descrição</th>
                                            <th align="center" valign="top">Detalhes</th>
                                            <th align="center" valign="top">Valor</th>
                                            <th align="center" valign="top">Saída</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    ${constructorDespesas(data.despesasHoje)}
                                    </tbody>
                                </table>
                                <table width="100%" cellpadding="2">
                                <caption style="font-weight: bold; padding: 20px 0; margin: 20px 0; background: #222; color: #fff; text-transform: uppercase"><span style="color: #FFDD00; font-size: 20px">.&nbsp;</span>Despesas de Amanhã<span style="color: #FFDD00; font-size: 20px">&nbsp;.</span></caption>
                                <thead>
                                    <tr>
                                        <th align="center" valign="top">Descrição</th>
                                        <th align="center" valign="top">Detalhes</th>
                                        <th align="center" valign="top">Valor</th>
                                        <th align="center" valign="top">Saída</th>
                                    </tr>
                                </thead>
                                <tbody>
                                ${constructorDespesas(data.despesasAmanha)}
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