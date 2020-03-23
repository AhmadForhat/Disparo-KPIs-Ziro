const constructorAssessor = (dado) => {
    if(dado){
        const arrayAssessor = dado.split('#')
        let constructor = ''
        for (let i = 6; i< arrayAssessor.length; i += 6){
            if(arrayAssessor[3] != 0){
                if(i == 0){
                    constructor += 
                `<tr>
                <td align="center" valign="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">${arrayAssessor[i]}</td>
                <td align="center" valign="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">${arrayAssessor[i+1]}</td>
                <td align="center" valign="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">${arrayAssessor[i+2]}</td>
                <td align="center" valign="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">${arrayAssessor[i+3]}</td>
                <td align="center" valign="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">${arrayAssessor[i+4]}</td>
                <td align="center" valign="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)">${arrayAssessor[i+5]}</td>
                </tr>
                `
                }else{
                    constructor += 
                `<tr>
                <td align="center" valign="top">${arrayAssessor[i]}</td>
                <td align="center" valign="top">${arrayAssessor[i+1]}</td>
                <td align="center" valign="top">${arrayAssessor[i+2]}</td>
                <td align="center" valign="top">${arrayAssessor[i+3]}</td>
                <td align="center" valign="top">${arrayAssessor[i+4]}</td>
                <td align="center" valign="top">${arrayAssessor[i+5]}</td>
                </tr>
                `
                }
            
            }else{
                constructor = 
            `<tr>
            <td align="center" valign="top">${0}</td>
            <td align="center" valign="top">R$ ${0}</td>
            <td align="center" valign="top">${0}</td>
            <td align="center" valign="top">${0}</td>
            <td align="center" valign="top">${0}</td>
            <td align="center" valign="top">${0}</td>
            </tr>
            `
            }
        }
        return constructor
    }
}

module.exports = constructorAssessor