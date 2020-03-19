const promiseVendas = require('./disparoFuncao')

const retryHttp = async (kpis,html,titulo,condicionalHorario,condicionalLoop) => {
    try {
        if(condicionalLoop){
            const send = await promiseVendas(kpis,html(kpis[0]),titulo,condicionalHorario)
            return send
        }
        else{
            console.log('Não ok!')
            return new Promise(resolve =>
                setTimeout(() => resolve(retryHttp(kpis)), 4000)
            )
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports = retryHttp