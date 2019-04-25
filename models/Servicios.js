
module.exports = (sequelize, DataTypes) => {
  const Servicios = sequelize.define('Servicios', {
    c_descripcion  : {
      type   : DataTypes.STRING,
      unique : true
    },
    c_unidad          : DataTypes.STRING,
    n_id_grupo        : DataTypes.INTEGER,
    b_activo          : DataTypes.BOOLEAN,
    t_observacion     : DataTypes.TEXT,
    n_comision        : DataTypes.FLOAT,
    n_iva             : DataTypes.INTEGER,
    n_valor           : DataTypes.FLOAT,
    n_id_moneda       : DataTypes.INTEGER,


  }, {
    tableName: 'Servicios',
  });

  Servicios.associate = (models) => {

    Servicios.belongsTo(models.ServiciosGrupos, {
      foreignKey : 'n_id_grupo',
      as         : 'servicioGrupo'
    });
    Servicios.belongsTo(models.Monedas, {
      foreignKey : 'n_id_moneda',
      as         : 'moneda'
    });
    
  };


  return Servicios;
};
