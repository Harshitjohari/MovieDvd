const jwt = require('jsonwebtoken')



module.exports = {
    getJwtToken: async (data) => {
        let token = await jwt.sign(
            {
                data: data,
                exp: Date.now() + 60 * 60 * 1000,
            },
            'sUpER@SecReT');
        return token
    },

}







// Any other file where you want to use the getJwtToken function
// const JWT = require('./jwt');
// const jwt =  JWT.getJwtToken(6);
// console.log("Generated JWT:", jwt);