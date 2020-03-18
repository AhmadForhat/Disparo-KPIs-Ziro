const promiseVendas = require('./disparoFuncao')
const html = require('./util/htmlVendas')

const retryHttp = async (kpisVendas) => {
    try {
        const vendaHoje = kpisVendas[0].assessores
        const destinatarios = kpisVendas[0].destinatarios
        if(vendaHoje.startsWith('Total') && destinatarios != ''){
            const arrayEmailVendas = destinatarios.split(',')
            const now = new Date()
            const hora = now.getUTCHours()
            const diaSemana = now.getUTCDay()
            if(hora == 22 && diaSemana != 6 && diaSemana != 0) return await promiseVendas(arrayEmailVendas,kpisVendas,html(kpisVendas[0]),'Vendas')
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