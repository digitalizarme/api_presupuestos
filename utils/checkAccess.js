const { getUserByToken } = require('../repositories/usuarios');

module.exports = async (token, campo) => {
  const user = await getUserByToken(token);
  const isAllowed = user && user[campo]===true;

  if (!isAllowed) {
    const error = {
      status  : 403,
      message : 'No tienes permisos para acceder a esta pagina.',
    };
    throw error;
  }
  return true;
};
