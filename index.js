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
        const minuto = now.getUTCMinutes()
        const diaSemana = now.getUTCDay()
        if(hora == 22 && minuto < 10 && diaSemana != 6 && diaSemana != 0){
        let i = arrayEmail.length
        let funcoesPromise = []
        while(i>0){
            i--
            funcoesPromise.push([enviarEmail(arrayEmail,i,data, dataMes, dataDia)])
        }
            return await Promise.all(funcoesPromise)
        }else{
            console.log('Horário ou data não disponível para disparo!')
            return "OK"
        }
    } catch (error) {
        console.log(error)
        return "OK"
    }
}

main()