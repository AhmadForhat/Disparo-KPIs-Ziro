const retryHttp = require('./retryHttp')
const rp = require('request-promise-native')
const optionsGoogle = require('./solicitacaoSheets')
const arrayObject = require('@ziro/array-object')
const htmlVendas = require('./util/htmlVendas')
const htmlFluxoCaixa = require('./util/htmlFluxoCaixa')

const resulTimeOut = async () => {
    // Requisições
    const requests = await rp(optionsGoogle(['vendas!A1:M2','fluxo de caixa!A1:K2','fluxo de caixa revisao!A1:K2']))
    const [baseKpisVendas,baseKpisFluxoCaixa, baseKpisFluxoCaixaRevisao] = requests.valueRanges
    const kpisFluxoCaixa = arrayObject(baseKpisFluxoCaixa)
    const kpisFluxoCaixaRevisão = arrayObject(baseKpisFluxoCaixaRevisao)
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
    //Fluxo de caixa
    //Funções de horários Fluxo de Caixa
    const condicionalHoraFluxoCaixa = hora == 22 && diaSemana != 6 && diaSemana != 0
    // Condicional de loop Fluxo de Caixa
    const saldoHojeCedo = kpisFluxoCaixa[0].saldoHojeCedo
    const dispesasDia = kpisFluxoCaixa[0].dispesasDia
    const condicionalLoopFluxoCaixa = saldoHojeCedo != '' && dispesasDia != ''
    //Fluxo de caixa - Revisão
    //Funções de horários Fluxo de Caixa
    const condicionalHoraFluxoCaixaRevisao = hora == 19 && diaSemana != 6 && diaSemana != 0
    // Condicional de loop Fluxo de Caixa
    const saldoHojeCedoRevisao = kpisFluxoCaixaRevisão[0].saldoHojeCedo
    const dispesasDiaRevisao = kpisFluxoCaixaRevisão[0].dispesasDia
    const condicionalLoopFluxoCaixaRevisao = saldoHojeCedoRevisao != '' && dispesasDiaRevisao != ''
    //Resultados
    const resultVendas = await retryHttp(kpisVendas,htmlVendas,'Vendas',condicionalVendas,condicionalHoraLoopVendas)
    const resultFluxoCaixa = await retryHttp(kpisFluxoCaixa,htmlFluxoCaixa,'Fluxo de Caixa',condicionalHoraFluxoCaixa,condicionalLoopFluxoCaixa)
    const resultFluxoCaixaRevisao = await retryHttp(kpisFluxoCaixaRevisão,htmlFluxoCaixa,'Fluxo de Caixa Revisão',condicionalHoraFluxoCaixaRevisao,condicionalLoopFluxoCaixaRevisao)
    console.log(resultVendas,resultFluxoCaixa,resultFluxoCaixaRevisao)
}

module.exports = resulTimeOut