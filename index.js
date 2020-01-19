const rp = require('request-promise-native');
const enviarEmail = require('./Apoio/enviarEmail')
const optionsGoogle = require('./Apoio/solicitacaoSheets')
require('dotenv').config()

//GoogleSheets GET

 async function main(){
    try {
        let data = await rp(optionsGoogle("main!A1:M2"))
        let dataMes = await rp(optionsGoogle("main!O2:R100"))
        let dataDia = await rp(optionsGoogle("main!S2:V100"))
        let arrayEmail = (data.values[1][0]).split(",")
        const now = new Date();
        const hora = now.getUTCHours()
        const diaSemana = now.getUTCDay()
            let i = arrayEmail.length
            let funcoesPromise = []
        if(hora == 22 && diaSemana != 6 && diaSemana != 0){
            while(i>0){
                i--
                funcoesPromise.push([enviarEmail(arrayEmail,i,data, dataMes, dataDia)])
            }
            console.log(await Promise.all(funcoesPromise))
        }
    } catch (error) {
        console.log(error)
    }
}

main()