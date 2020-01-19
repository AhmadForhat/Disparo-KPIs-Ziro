const constructorAssessor = (data,posicaoArray) => {
    const arrayAssessor = data.values[1][posicaoArray].split("#")
    let constructor = ""
    for (i = 0; i< arrayAssessor.length; i += 3){
        if(arrayAssessor[3] != ""){
            constructor += 
            `<tr>
            <td align="center" valign="top">${arrayAssessor[i]}</td>
            <td align="center" valign="top">R$ ${arrayAssessor[i+1]}</td>
            <td align="center" valign="top">${arrayAssessor[i+2]}</td>
            </tr>
            `
        }else{
            constructor = 
            `<tr>
            <td align="center" valign="top">Total</td>
            <td align="center" valign="top">R$ ${0}</td>
            <td align="center" valign="top">${0}</td>
            </tr>
            `
        }
    }
    return constructor
}

module.exports = constructorAssessor