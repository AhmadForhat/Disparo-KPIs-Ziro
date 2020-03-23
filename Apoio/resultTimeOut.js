const retryHttp = require('./retryHttp')
const rp = require('request-promise-native')
const optionsGoogle = require('./solicitacaoSheets')
const arrayObject = require('@ziro/array-object')
const htmlVendas = require('./util/htmlVendas')
const htmlFluxoCaixa = require('./util/htmlFluxoCaixa')

const resulTimeOut = async () => {
    // Requisições
    const requests = await rp(optionsGoogle(['vendas!A1:M2','fluxo de caixa revisao!A1:J2']))
    const [baseKpisVendas,baseKpisFluxoCaixa] = requests.valueRanges
    const kpisFluxoCaixa = arrayObject(baseKpisFluxoCaixa)
    const kpisVendas = arrayObject(baseKpisVendas)
    //Vendas
    // Funções de horários Vendas
    const now = new Date()
    const hora = now.getUTCHours()
    const diaSemana = now.getUTCDay()
    const condicionalVendas = hora == 22 && diaSemana != 6 && diaSemana != 0
    // Condicional de loop Vendas
    const vendaHoje = kpisVendas[0].assessores
    const destinatariosVendas = kpisVendas[0].destinatarios
    const condicionalHoraLoopVendas = vendaHoje.startsWith('Total') && destinatariosVendas != ''
    //Fluxo de caixa Revisão
    //Funções de horários Fluxo de Caixa
    const condicionalHoraFluxoCaixa = hora == 19 && diaSemana != 6 && diaSemana != 0
    // Condicional de loop Fluxo de Caixa
    const saldoHojeCedo = kpisFluxoCaixa[0].saldoHojeCedo
    const dispesasDia = kpisFluxoCaixa[0].dispesasDia
    const condicionalLoopFluxoCaixa = saldoHojeCedo != '' && dispesasDia != ''
    // Resultados
    const resultVendas = await retryHttp(kpisVendas,htmlVendas,'Vendas',condicionalVendas,condicionalHoraLoopVendas)
    const resultFluxoCaixa = await retryHttp(kpisFluxoCaixa,htmlFluxoCaixa,'Fluxo de Caixa',condicionalHoraFluxoCaixa,condicionalLoopFluxoCaixa)
    console.log(resultVendas,resultFluxoCaixa)
}

module.exports = resulTimeOut