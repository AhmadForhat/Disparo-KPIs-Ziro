const constructorFluxoFuturo = require('./constructorFluxoFuturo')
const constructorDespesas = require('./constructorDespesas')
const constructorReembolsaveis = require('./constructorReembolsaveis')

const html = (data) => {
    const dataHoje = data.hoje
    const saldoHojeCedo = data.saldoHojeCedo
    const saldoHojeTarde = data.saldoHojeTarde
    const saldoHojeBalanco = data.saldoBalanco
    const arraySaldoHojeCedo = saldoHojeCedo.split('#')
    const arraySaldoHojeTarde = saldoHojeTarde.split('#')
    const arraySaldoBalanco = saldoHojeBalanco.split('#')
    return  `
    <table style="font-family: Arial" font-size="12px" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
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
                                        <caption style="font-weight: bold; padding: 20px 0; margin-bottom: 20px; background: #222; color: #fff; text-transform: uppercase"><span style="color: #FFDD00; font-size: 20px">.&nbsp;</span>Saldos de hoje<span style="color: #FFDD00; font-size: 20px">&nbsp;.</span></caption>
                                        <thead>
                                            <tr>
                                                <th align="center" valign="top">Período</th>
                                                <th align="center" valign="top">Caixa Int.</th>
                                                <th align="center" valign="top">Inter</th>
                                                <th align="center" valign="top">Aporte</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                            <td align="center" valign="top">Manhã</td>
                                            <td align="center" valign="top">${arraySaldoHojeCedo[0]}</td>
                                            <td align="center" valign="top">${arraySaldoHojeCedo[1]}</td>
                                            <td align="center" valign="top">${arraySaldoHojeCedo[2]}</td>
                                            </tr>
                                            <tr>
                                            <td align="center" valign="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">Tarde</td>
                                            <td align="center" valign="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">${arraySaldoHojeTarde[0]}</td>
                                            <td align="center" valign="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">${arraySaldoHojeTarde[1]}</td>
                                            <td align="center" valign="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">${arraySaldoHojeTarde[2]}</td>
                                            </tr>
                                            <tr>
                                            <td align="center" valign="top">Balanço</td>
                                            <td align="center" valign="top">${arraySaldoBalanco[0]}</td>
                                            <td align="center" valign="top">${arraySaldoBalanco[1]}</td>
                                            <td align="center" valign="top">${arraySaldoBalanco[2]}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- Inicio saldo futuro -->
                                    <table width="100%" cellpadding="2">
                                        <caption style="font-weight: bold; padding: 20px 0; margin: 20px 0; background: #222; color: #fff; text-transform: uppercase"><span style="color: #FFDD00; font-size: 20px">.&nbsp;</span>Saldo Futuro<span style="color: #FFDD00; font-size: 20px">&nbsp;.</span></caption>
                                        <thead>
                                            <tr>
                                                <th align="center" valign="top">Data</th>
                                                <th align="center" valign="top">Caixa Int.</th>
                                                <th align="center" valign="top">Inter</th>
                                                <th align="center" valign="top">Aporte</th>
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
                                            <th align="center" valign="top" width="30%">Descrição</th>
                                            <th align="center" valign="top" width="30%">Detalhes</th>
                                            <th align="center" valign="top" width="15%">Valor</th>
                                            <th align="center" valign="top" width="15%">Saída</th>
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
                                    <th align="center" valign="top" width="30%">Descrição</th>
                                    <th align="center" valign="top" width="30%">Detalhes</th>
                                    <th align="center" valign="top" width="15%">Valor</th>
                                    <th align="center" valign="top" width="15%">Saída</th>
                                    </tr>
                                </thead>
                                <tbody>
                                ${constructorDespesas(data.despesasAmanha)}
                                </tbody>
                            </table>
                            <table width="100%" cellpadding="2">
                            <caption style="font-weight: bold; padding: 20px 0; margin: 20px 0; background: #222; color: #fff; text-transform: uppercase"><span style="color: #FFDD00; font-size: 20px">.&nbsp;</span>Despesas Reembolsáveis<span style="color: #FFDD00; font-size: 20px">&nbsp;.</span></caption>
                            <thead>
                                <tr>
                                    <th align="center" valign="top" width="30%">Status</th>
                                    <th align="center" valign="top" width="30%">Valor</th>
                                    <th align="center" valign="top" width="30%">Envios</th>
                                </tr>
                            </thead>
                            <tbody>
                            ${constructorReembolsaveis(data.reembolsaveis)}
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
                                    <q>Money is a terrible master, but an excellent servant.</q>
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