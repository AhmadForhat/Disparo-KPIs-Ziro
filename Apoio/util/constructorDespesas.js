const constructorAssessor = (dadoAssessores) => {
    if(dadoAssessores){
        const arrayAssessor = dadoAssessores.split('#')
        let constructor = ''
        for (let i = 0; i< arrayAssessor.length; i += 4){
            if(true){
                if(i == 0){
                    constructor += 
                `<tr>
                <td align="center" valign="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)" width="30%">${arrayAssessor[i]}</td>
                <td align="center" valign="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)" width="30%">${arrayAssessor[i+1]}</td>
                <td align="center" valign="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)" width="15%">${arrayAssessor[i+2]}</td>
                <td align="center" valign="top" style="border-bottom: 1px dotted rgba(0,0,0,0.1)" width="15%">${arrayAssessor[i+3]}</td>
                </tr>
                `
                }else{
                    constructor += 
                `<tr>
                <td align="center" valign="top" width="30%">${arrayAssessor[i]}</td>
                <td align="center" valign="top" width="30%">${arrayAssessor[i+1]}</td>
                <td align="center" valign="top" width="15%">${arrayAssessor[i+2]}</td>
                <td align="center" valign="top" width="15%">${arrayAssessor[i+3]}</td>
                </tr>
                `
                }
            
            }else{
                constructor = 
            `<tr>
            <td align="center" valign="top" width="30%">${0}</td>
            <td align="center" valign="top" width="30%">${0}</td>
            <td align="center" valign="top" width="15%">${0}</td>
            <td align="center" valign="top" width="15%">${0}</td>
            </tr>
            `
            }
        }
        return constructor
}
}

module.exports = constructorAssessor