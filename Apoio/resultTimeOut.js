const retryHttp = require('./retryHttp')
const rp = require('request-promise-native')
const optionsGoogle = require('./solicitacaoSheets')
const arrayObject = require('@ziro/array-object')
const htmlVendas = require('./util/htmlVendas')

const resulTimeOut = async () => {
    // Requisições
    const requests = await rp(optionsGoogle(['vendas!A1:M2']))
    const [baseKpisVendas] = requests.valueRanges
    const kpisVendas = arrayObject(baseKpisVendas)
    //Vendas
    // Funções de horários
    const now = new Date()
    const hora = now.getUTCHours()
    const diaSemana = now.getUTCDay()
    const condicionalVendas = hora == 22 && diaSemana != 6 && diaSemana != 0
    // Condicional de loop
    const vendaHoje = kpisVendas[0].assessores
    const destinatariosVendas = kpisVendas[0].destinatarios
    const condicionalLoopVendas = vendaHoje.startsWith('Total') && destinatariosVendas != ''
    // Resultados
    const resultVendas = await retryHttp(kpisVendas,htmlVendas,'Vendas',condicionalVendas,condicionalLoopVendas)
    console.log(resultVendas)
}

module.exports = resulTimeOut