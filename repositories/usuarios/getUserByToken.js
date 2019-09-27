const jwt = require('jsonwebtoken');
const {Usuarios} = require('../../models');

const treatAuthToken = (token) => {
    token = token.split(' ')[1];
    return jwt.verify(token, process.env.JWT_KEY || 'Digitalizar.me API');
}

/**
 * extract user from jwt token
 * get the id and fetch the user
 * */
module.exports = async(token, extraParam) => {
    const data = treatAuthToken(token);

    if (!data.id) {
        throw Error('Usuario no ha iniciado la sesion.');
    }

    const param = Object.assign({
        where: {
            id: data.id
        }
    }, extraParam);

    return await Usuarios.findOne(param);
};
