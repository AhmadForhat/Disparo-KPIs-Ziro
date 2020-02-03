const rp = require('request-promise-native');
const enviarEmail = require('./Apoio/enviarEmail')
const optionsGoogle = require('./Apoio/solicitacaoSheets')
require('dotenv').config()

//GoogleSheets GET

const retryHttp = async (data) => {
    try {
                let funcoesPromise = []
        if(data.values[1][9].startsWith("Total") || data.values[1][3] == '#N/A'){
                    const arrayEmail = (data.values[1][0]).split(",")
                    const now = new Date();
                    const hora = now.getUTCHours()
                    const diaSemana = now.getUTCDay()
                    if(hora == 22 && diaSemana != 6 && diaSemana != 0){
                        let i = arrayEmail.length
                        while(i>0){
                            i--
                            funcoesPromise.push(enviarEmail(arrayEmail,i,data))
                        }
                    }
                        console.log(await Promise.all(funcoesPromise))
            return "OK"
                }else{
            console.log("Não ok!")
            return new Promise(resolve =>
              setTimeout(() => resolve(retryHttp(data)), 1000)
              );
                            }
    } catch (error) {
      console.log(error);
      return error;
                        }
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