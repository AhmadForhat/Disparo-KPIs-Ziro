const enviarEmail = require('./enviarEmail')

const retryHttp = async (kpisVendas) => {
    try {
        let funcoesPromise = []
        const vendaHoje = kpisVendas[0].assessores
        const destinatarios = kpisVendas[0].destinatarios
        if(vendaHoje.startsWith('Total') && destinatarios != ''){
            const arrayEmail = destinatarios.split(',')
            const now = new Date()
            const hora = now.getUTCHours()
            const diaSemana = now.getUTCDay()
            if(hora == 22 && diaSemana != 6 && diaSemana != 0){
                let i = arrayEmail.length
                while(i>0){
                    i--
                    funcoesPromise.push(enviarEmail(arrayEmail,i,kpisVendas))
                }
            }
            return await Promise.all(funcoesPromise)
        }else{
            console.log('Não ok!')
            return new Promise(resolve =>
                setTimeout(() => resolve(retryHttp(kpisVendas)), 4000)
            )
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = retryHttp