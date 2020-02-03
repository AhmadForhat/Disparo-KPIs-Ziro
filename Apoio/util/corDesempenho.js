const corDesempenho = (descricaoMeta) => {
    if(descricaoMeta == "Abaixo da Meta x2"){
        return "color: #881600"
    }if(descricaoMeta == "Abaixo da Meta x2,5"){
        return "color: #E53A40"
    }if(descricaoMeta == "Abaixo da Meta x3"){
        return "color: #FFBC42"
    }if(descricaoMeta == "Meta atingida"){
        return "color: #5A9367"
    }else{
        return "color: black"
    }
}

module.exports = corDesempenho