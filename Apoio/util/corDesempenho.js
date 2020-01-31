const corDesempenho = (data) => {
    if(data.values[1][6] == "Abaixo da meta x2"){
        return "color: #881600"
    }if(data.values[1][6] == "Abaixo da Meta x2,5"){
        return "color: #E53A40"
    }if(data.values[1][6] == "Abaixo da Meta x3"){
        return "color: #FFBC42"
    }if(data.values[1][6] == "Meta atingida"){
        return "color: #5A9367"
    }else{
        return "color: black"
    }
}

module.exports = corDesempenho