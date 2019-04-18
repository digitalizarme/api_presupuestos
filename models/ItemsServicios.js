'use strict';

module.exports = (sequelize, DataTypes) => {
  const ItemsServicios = sequelize.define('ItemsServicios', {
    c_descripcion                       : {
      type   : DataTypes.STRING,
      unique : true
    },
    n_id_presupuesto: DataTypes.INTEGER,
    n_cantidad      : DataTypes.FLOAT,
    n_unitario      : DataTypes.FLOAT,
    n_exentas       : DataTypes.FLOAT,
    n_gravadas_5    : DataTypes.FLOAT,
    n_gravadas_10   : DataTypes.FLOAT,
    t_observacion   : DataTypes.TEXT,
  }, {
    tableName: 'ItemsServicios',
  });

  ItemsServicios.associate = (models) => {

    ItemsServicios.belongsTo(models.Presupuestos, {
      foreignKey : 'n_id_presupuesto',
      as         : 'presupuesto'
    });
    
  };


  return ItemsServicios;
};