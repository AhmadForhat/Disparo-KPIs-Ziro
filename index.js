const resultTimeOut = require('./Apoio/resultTimeOut')
require('dotenv').config()
  
async function main(){
  try {
    resultTimeOut()
  } catch (error) {
      console.log("Erro no disparo de email", error)
  }
}

main()