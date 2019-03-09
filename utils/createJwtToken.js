const jwt = require('jsonwebtoken');

module.exports = param => jwt.sign(param, process.env.JWT_KEY|| 'Digitalizar.me API');
