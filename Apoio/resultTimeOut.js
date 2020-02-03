const retryHttp = require('./retryHttp')

const resulTimeOut = async (baseDados) => {
    const result = await retryHttp(baseDados);
    console.log(result);
  };

module.exports = resulTimeOut