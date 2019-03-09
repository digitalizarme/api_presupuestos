const _ = require('lodash');

// const { findUserBySocialtoken } = require('../user');
const { createJwtToken } = require('../../utils');
const { encrypt } = require('../../utils/');
const { Usuarios,Personas } = require('../../models');

const LOGIN_ERROR_MESSAGE = 'Email ou senha inválido. Tente novamente por favor.';

/**
 * login the user
 */
module.exports = async (data) => {
  let user;

  if (_.get(data, 'email') && _.get(data, 'contrasena')) {
    //const hash = encrypt(data.contrasena);
    user = await Usuarios.findOne({where:
      {c_contrasena: data.contrasena},
      include: 
          {
            model : Personas,
            as    : 'persona',
            where: {
              c_email: data.email.toLowerCase()
            }
            },
        
      });

  } 
  // else if (_.get(data, 'socialToken')) {
  //   user = await findUserBySocialtoken(data.socialToken);
  // } 
  else {
    throw {
      status    : 500, 
      message   : LOGIN_ERROR_MESSAGE,
      errorCode : "001"
    };
  }

  if (!user) {
    throw {
      status    : 500, 
      message   : LOGIN_ERROR_MESSAGE,
      errorCode : "001"
    };
  }

  const token = createJwtToken({
    username: user.email,
    id: user.id,
  });

  return {
    ...user.dataValues,
    token,
  };
};
