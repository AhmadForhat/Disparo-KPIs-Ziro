const retryHttp = require('./retryHttp')
const rp = require('request-promise-native')
const optionsGoogle = require('./solicitacaoSheets')
const arrayObject = require('@ziro/array-object')

const resulTimeOut = async () => {
    const baseKpisVendas = await rp(optionsGoogle('main!A1:M2'))
    const kpisVendas = arrayObject(baseKpisVendas)
    const result = await retryHttp(kpisVendas)
    console.log(result)
}

module.exports = resulTimeOut