const optionsGoogle = (range) => {
    const url = "https://sheets.ziro.app/.netlify/functions/api"
    const username = process.env.userSheets
    const password = process.env.pdwSheets
    const auth = "Basic " + new Buffer.from(username + ":" + password).toString("base64");
   return {
            method: "GET",
            url:url,
            headers: {
                "Origin": "https://ziro.app",
                "Content-type": "application/json",
                "Authorization": auth
            },
            body : {
                "apiResource": "values",
                "apiMethod": "get",
                "spreadsheetId": process.env.sheetsId,
                "range": range
            },
            json: true
        }
    }

module.exports = optionsGoogle