const _ = require('lodash');

// const { findUserBySocialtoken } = require('../user');
const { createJwtToken } = require('../../utils');
const { encrypt } = require('../../utils/');
const { Usuarios,Personas } = require('../../models');

/**
 * login the user
 */
module.exports = async (data) => {
  let user;

  if (_.get(data, 'email') && _.get(data, 'contrasena')) {
    const hashContrasena = encrypt(data.contrasena);
    user = await Usuarios.findOne({where:
      {c_contrasena: hashContrasena},
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
  else {
    throw {
      status    : 500, 
      message   : "No Recibimos el email o la contraseña",
    };
  }
  if (!user) {
    throw {
      status    : 500, 
      message   : "Email o Contraseña incorrecta, favor intentar nuevamente",
    };
  }

  if(!user.b_activo)
  {
    throw {
      status    : 500, 
      message   : "Este usuario no esta activo en el sistema",
    };
  }

  const token = createJwtToken({
    username: user.email,
    id: user.id,
  });
  let usuario = user.dataValues;
  delete usuario.c_contrasena;
  delete usuario.createdAt;
  delete usuario.updatedAt;
  return {
    ...usuario,
    token,
  };
};
