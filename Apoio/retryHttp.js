const enviarEmail = require('./enviarEmail')
const rp = require('request-promise-native');
const optionsGoogle = require('./solicitacaoSheets')

const retryHttp = async () => {
    try {
      let funcoesPromise = []
      const baseKpisVendas = await rp(optionsGoogle("main!A1:M2"))
      const vendaHoje = baseKpisVendas.values[1][9]
      const destinatarios = baseKpisVendas.values[1][0]
        if(vendaHoje.startsWith("Total") && destinatarios != ""){
            const arrayEmail = destinatarios.split(",")
            const now = new Date();
            const hora = now.getUTCHours()
            const diaSemana = now.getUTCDay()
            if(hora == 22 && diaSemana != 6 && diaSemana != 0){
                    let i = arrayEmail.length
                    while(i>0){
                        i--
                        funcoesPromise.push(enviarEmail(arrayEmail,i,baseKpisVendas))
                    }
            }
                return await Promise.all(funcoesPromise)
        }else{
            console.log("Não ok!")
            return new Promise(resolve =>
              setTimeout(() => resolve(retryHttp(baseKpisVendas)), 4000)
              );
        }
    } catch (error) {
      console.log(error);
      return error;
      }
  }

  module.exports = retryHttp