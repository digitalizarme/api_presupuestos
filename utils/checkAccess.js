//const { getUserByToken } = require('../repositories/user');

module.exports = async function checkAccess(token, allowedTypes) {
  const user = null;//await getUserByToken(token);
  const isAllowed = user && allowedTypes.includes(user.type);

  if (!isAllowed) {
    const error = {
      status  : 403,
      message : 'Você não está autorizado a utilizar este método.',
    };
    throw error;
  }
};
