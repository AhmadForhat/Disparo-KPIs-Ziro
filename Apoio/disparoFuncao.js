const enviarEmail = require('./enviarEmail')

const promiseVendas = async (arrayEmail,kpisVendas,corpoEmail,titulo) => {
    let funcoesPromise = []
    let i = arrayEmail.length
    while(i>0){
        i--
        funcoesPromise.push(enviarEmail(arrayEmail,i,kpisVendas,corpoEmail,titulo))
    }
    return await Promise.all(funcoesPromise)
}

module.exports = promiseVendas  