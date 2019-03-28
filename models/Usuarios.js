
module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define('Usuarios', {
    c_id_persona          : DataTypes.STRING,
    c_usuario  : {
      type   : DataTypes.STRING,
      unique : true
    },
    c_contrasena          : DataTypes.STRING,
    b_activo              : DataTypes.BOOLEAN,
    b_administrador       : DataTypes.BOOLEAN,
    b_cadastrar           : DataTypes.BOOLEAN,
    b_editar              : DataTypes.BOOLEAN,
    b_eliminar            : DataTypes.BOOLEAN,
    b_imprimir            : DataTypes.BOOLEAN,
    createdAt             : DataTypes.DATE,
    updatedAt             : DataTypes.DATE,


  }, {
    tableName: 'usuarios',
  });

  Usuarios.associate = (models) => {
    Usuarios.belongsTo(models.Personas, {
      foreignKey : 'c_id_persona',
      as         : 'persona'
    });
  };


  return Usuarios;
};
