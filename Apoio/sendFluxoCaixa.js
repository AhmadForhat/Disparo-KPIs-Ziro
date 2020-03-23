const retryHttp = require('./retryHttp')
const rp = require('request-promise-native')
const optionsGoogle = require('./solicitacaoSheets')
const arrayObject = require('@ziro/array-object')
const htmlFluxoCaixa = require('./util/htmlFluxoCaixa')
require('dotenv').config()

const resulTimeOut = async () => {
    // Requisições
    const requests = await rp(optionsGoogle(['fluxo de caixa!A1:J2']))
    const [baseKpisFluxoCaixa] = requests.valueRanges
    const kpisFluxoCaixa = arrayObject(baseKpisFluxoCaixa)
    //Fluxo de caixa --> Oficial
    //Funções de horários Fluxo de Caixa
    const condicionalHoraFluxoCaixa = true
    // Condicional de loop Fluxo de Caixa
    const saldoHojeCedo = kpisFluxoCaixa[0].saldoHojeCedo
    const dispesasDia = kpisFluxoCaixa[0].dispesasDia
    const condicionalLoopFluxoCaixa = saldoHojeCedo != '' && dispesasDia != ''
    // Resultados
    const resultFluxoCaixa = await retryHttp(kpisFluxoCaixa,htmlFluxoCaixa,'Fluxo de Caixa',condicionalHoraFluxoCaixa,condicionalLoopFluxoCaixa)
    console.log(resultFluxoCaixa)
}
  
async function main(){
    try {
        resulTimeOut()
    } catch (error) {
        console.log('Erro no disparo de email', error)
    }
}

main()