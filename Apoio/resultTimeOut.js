const retryHttp = require('./retryHttp')
const rp = require('request-promise-native')
const optionsGoogle = require('./solicitacaoSheets')
const arrayObject = require('@ziro/array-object')
const htmlVendas = require('./util/htmlVendas')
const htmlFluxoCaixa = require('./util/htmlFluxoCaixa')

const resulTimeOut = async () => {
    // Requisições
    const requests = await rp(optionsGoogle(['vendas!A1:M2','fluxo de caixa!A1:J2','fluxo de caixa Revisao!A1:J2']))
    const [baseKpisVendas,baseKpisFluxoCaixa, baseKpisFluxoCaixaRevisao] = requests.valueRanges
    const kpisFluxoCaixa = arrayObject(baseKpisFluxoCaixa)
    const kpisFluxoCaixaRevisao = arrayObject(baseKpisFluxoCaixaRevisao)
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
    //Fluxo de caixa --> Oficial
    //Funções de horários Fluxo de Caixa
    const condicionalHoraFluxoCaixa = hora == 22 && diaSemana != 6 && diaSemana != 0
    // Condicional de loop Fluxo de Caixa
    const saldoHojeCedo = kpisFluxoCaixa[0].saldoHojeCedo
    const dispesasDia = kpisFluxoCaixa[0].dispesasDia
    const condicionalLoopFluxoCaixa = saldoHojeCedo != '' && dispesasDia != ''
    //Fluxo de caixa --> Bruno
    //Funções de horários Fluxo de Caixa
    const condicionalHoraFluxoCaixaRevisao = hora == 19 && diaSemana != 6 && diaSemana != 0
    // Resultados
    const resultVendas = await retryHttp(kpisVendas,htmlVendas,'Vendas',condicionalVendas,condicionalHoraLoopVendas)
    const resultFluxoCaixa = await retryHttp(kpisFluxoCaixa,htmlFluxoCaixa,'Fluxo de Caixa',condicionalHoraFluxoCaixa,condicionalLoopFluxoCaixa)
    const resultFluxoCaixaRevisao = await retryHttp(kpisFluxoCaixaRevisao,htmlFluxoCaixa,'Fluxo de Caixa',condicionalHoraFluxoCaixaRevisao,condicionalLoopFluxoCaixa)
    console.log(resultVendas,resultFluxoCaixa,resultFluxoCaixaRevisao)
}

module.exports = resulTimeOut