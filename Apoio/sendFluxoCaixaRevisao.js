const retryHttp = require('./retryHttp')
const rp = require('request-promise-native')
const optionsGoogle = require('./solicitacaoSheets')
const arrayObject = require('@ziro/array-object')
const htmlFluxoCaixa = require('./util/htmlFluxoCaixa')
require('dotenv').config()

const resulTimeOut = async () => {
    // Requisições
    const requests = await rp(optionsGoogle(['fluxo de caixa Revisao!A1:J2']))
    const [baseKpisFluxoCaixaRevisao] = requests.valueRanges
    const kpisFluxoCaixaRevisao = arrayObject(baseKpisFluxoCaixaRevisao)
    // Condicional de loop Fluxo de Caixa
    const saldoHojeCedo = kpisFluxoCaixaRevisao[0].saldoHojeCedo
    const dispesasDia = kpisFluxoCaixaRevisao[0].dispesasDia
    const condicionalLoopFluxoCaixa = saldoHojeCedo != '' && dispesasDia != ''
    const condicionalHoraFluxoCaixaRevisao = true
    // Resultados
    const resultFluxoCaixaRevisao = await retryHttp(kpisFluxoCaixaRevisao,htmlFluxoCaixa,'Fluxo de Caixa',condicionalHoraFluxoCaixaRevisao,condicionalLoopFluxoCaixa)
    console.log(resultFluxoCaixaRevisao)
}
  
async function main(){
    try {
        resulTimeOut()
    } catch (error) {
        console.log('Erro no disparo de email', error)
    }
}

main()