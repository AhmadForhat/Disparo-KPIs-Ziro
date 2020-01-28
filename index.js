const rp = require('request-promise-native');
const enviarEmail = require('./Apoio/enviarEmail')
const optionsGoogle = require('./Apoio/solicitacaoSheets')
require('dotenv').config()

//GoogleSheets GET

 async function main(){
    try {
        const data = await rp(optionsGoogle("main!A1:M2"))
            try {
                if(data.values[1][9].startsWith("Total") || data.values[1][0] == ""){
                    const arrayEmail = (data.values[1][0]).split(",")
                    const now = new Date();
                    const hora = now.getUTCHours()
                    const diaSemana = now.getUTCDay()
                        let i = arrayEmail.length
                        let funcoesPromise = []
                        while(i>0){
                            i--
                            funcoesPromise.push(enviarEmail(arrayEmail,i,data))
                        }
                        console.log(await Promise.all(funcoesPromise))
                }else{
                    setTimeout(async () => {
                        const arrayEmail = (data.values[1][0]).split(",")
                        const now = new Date();
                        const hora = now.getUTCHours()
                        const diaSemana = now.getUTCDay()
                            let i = arrayEmail.length
                            let funcoesPromise = []
                            while(i>0){
                                i--
                                funcoesPromise.push(enviarEmail(arrayEmail,i,data))
                            }
                            console.log("SetTimeOut")
                            console.log(await Promise.all(funcoesPromise))
                    }, 2000);
                }
            } catch (error) {
                console.log("Erro no disparo de email", error)
            }
    } catch (error) {
         console.log("Erro em data", error.options)
    }
}

main()