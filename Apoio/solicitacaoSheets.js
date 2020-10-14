const optionsBatchGet = ranges =>{
    const url = 'https://sheets.ziro.app/.netlify/functions/api'
    const username = process.env.userSheets
    const password = process.env.pdwSheets
    const auth = 'Basic ' + new Buffer.from(username + ':' + password).toString('base64')
    return {
        method: 'POST',
        url:url,
        headers: {
            'Origin': 'https://ziro.app',
            'Content-type': 'application/json',
            'Authorization': auth
        },
        body : {
            'apiResource': 'values',
            'apiMethod': 'batchGet',
            'spreadsheetId': process.env.sheetsId,
            'ranges': ranges
        },
        json: true
    }
}

module.exports = optionsBatchGet