'use strict';

module.exports = (sequelize, DataTypes) => {
  const Fletes = sequelize.define('Fletes', {
    c_tipo                       : {
      type   : DataTypes.STRING,
      unique : true
    },
    n_id_moneda      : DataTypes.INTEGER,
    n_valor          : DataTypes.FLOAT,
    b_activo         : DataTypes.BOOLEAN,
  }, {
    tableName: 'Fletes',
  });

  Fletes.associate = (models) => {

    Fletes.belongsTo(models.Monedas, {
      foreignKey : 'n_id_moneda',
      as         : 'moneda'
    });
    
  };


  return Fletes;
};