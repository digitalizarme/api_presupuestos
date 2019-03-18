
module.exports = (error) => {
  let erroPadrao;
  console.log(error);
  if(error.errors && error.errors.length >0)
  {
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

      case `c_descripcion must be unique`:
      erroPadrao = 'Yá existe esta descripción en el sistema';
      break;
      
    default: break;
    }
  }
  const erroBanco = error.original && error.original.sqlMessage?error.original.sqlMessage:error.original.code==='SQLITE_CONSTRAINT'?'No se pudo eliminar este registro porque esta siendo usado en otras partes del sistema':'Error desconocido';
  const errorMessage = erroPadrao?erroPadrao:erroBanco;
  return (errorMessage)
};
