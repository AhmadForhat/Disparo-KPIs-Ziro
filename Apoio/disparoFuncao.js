const enviarEmail = require('./enviarEmail')

const promiseVendas = async (basekpis,corpoEmail,titulo,condicionalHorario) => {
    if(condicionalHorario){
        const destinatarios = basekpis[0].destinatarios
        const arrayEmail = destinatarios.split(',')
        let funcoesPromise = []
        let i = arrayEmail.length
        while(i>0){
            i--
            funcoesPromise.push(enviarEmail(arrayEmail,i,basekpis,corpoEmail,titulo))
        }
        return await Promise.all(funcoesPromise)
    }
}

module.exports = promiseVendas