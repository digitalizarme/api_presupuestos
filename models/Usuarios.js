
module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define('Usuarios', {
    n_id_persona          : DataTypes.INTEGER,
    c_usuario  : {
      type   : DataTypes.STRING,
      unique : true
    },
    t_avatar              : DataTypes.TEXT,
    c_contrasena          : DataTypes.STRING,
    b_activo              : DataTypes.BOOLEAN,
    b_administrador       : DataTypes.BOOLEAN,
    b_cadastrar           : DataTypes.BOOLEAN,
    b_editar              : DataTypes.BOOLEAN,
    b_eliminar            : DataTypes.BOOLEAN,
    b_imprimir            : DataTypes.BOOLEAN,


  }, {
    tableName: 'Usuarios',
  });

  Usuarios.associate = (models) => {
    Usuarios.belongsTo(models.Personas, {
      foreignKey : 'n_id_persona',
      as         : 'persona'
    });
  };


  return Usuarios;
};
