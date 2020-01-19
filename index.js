const rp = require('request-promise-native');
const enviarEmail = require('./Apoio/enviarEmail')
const optionsGoogle = require('./Apoio/solicitacaoSheets')
require('dotenv').config()

//GoogleSheets GET

 async function main(){
    try {
        try {
            let data = await rp(optionsGoogle("main!A1:M2"))
                    try {
                        let arrayEmail = (data.values[1][0]).split(",")
                        const now = new Date();
                        const hora = now.getUTCHours()
                        const diaSemana = now.getUTCDay()
                        if(hora == 22 && diaSemana != 6 && diaSemana != 0){
                            let i = arrayEmail.length
                            let funcoesPromise = []
                            while(i>0){
                                i--
                                funcoesPromise.push(enviarEmail(arrayEmail,i,data))
                            }
                            console.log(await Promise.all(funcoesPromise))
                        }
                    } catch (error) {
                        console.log("Erro no disparo de email", error)
                    }
        } catch (error) {
            console.log("Erro em data", error.options)
        }
    } catch (error) {
        console.log(error)
    }
}

main()