const constructorAssessor = (data) => {
    let constructor = ""
    let chargesMes = data.values

    for (i = 1; i< chargesMes.length; i++){
        constructor += 
        `<tr>
        <td align="center" valign="top">${data.values[i][0]}</td>
        <td align="center" valign="top">${data.values[i][1]}</td>
        <td align="center" valign="top">${data.values[i][2]}</td>
        </tr>
    `
    }
    return constructor
}

module.exports = constructorAssessor