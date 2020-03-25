const retryHttp = require('./retryHttp')
const rp = require('request-promise-native')
const optionsGoogle = require('./solicitacaoSheets')
const arrayObject = require('@ziro/array-object')
const htmlVendas = require('./util/htmlVendas')
require('dotenv').config()

const resulTimeOut = async () => {
    // Vendas
    // Requisições
    const requests = await rp(optionsGoogle(['vendas!A1:M2']))
    const [baseKpisVendas] = requests.valueRanges
    const kpisVendas = arrayObject(baseKpisVendas)
    const condicionalVendas = true
    // Condicional de loop Vendas
    const vendaHoje = kpisVendas[0].assessores
    const destinatariosVendas = kpisVendas[0].destinatarios
    const condicionalHoraLoopVendas = vendaHoje.startsWith('Total') && destinatariosVendas != ''
    // Resultados
    const resultVendas = await retryHttp(kpisVendas,htmlVendas,'Vendas',condicionalVendas,condicionalHoraLoopVendas)
    console.log(resultVendas)
}
  
async function main(){
    try {
        resulTimeOut()
    } catch (error) {
        console.log('Erro no disparo de email', error)
    }
}

main()