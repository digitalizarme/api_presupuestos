const crypto = require('crypto');

module.exports = password => crypto.createHmac('sha256', password).digest('hex');
