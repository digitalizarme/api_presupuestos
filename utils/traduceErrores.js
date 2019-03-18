
module.exports = (error) => {
  let erroPadrao;
  console.log(error.errors[0].message);
  switch (error.errors[0].message) {
      case `c_identificacion must be unique`:
      erroPadrao = 'Yá existe este nuemro de identificación en el sistema';
      break;
      case `c_email must be unique`:
      erroPadrao = 'Yá existe este e-mail en el sistema';
      break;
      case `c_usuario must be unique`:
      erroPadrao = 'Yá existe este usuario en el sistema';
      break;
      
    default: break;
    }
  const erroBanco = error.original?error.original.sqlMessage:'Error desconocido';
  const errorMessage = erroPadrao?erroPadrao:erroBanco;
  return (errorMessage)
};
