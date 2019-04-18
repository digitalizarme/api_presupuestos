'use strict';

module.exports = (sequelize, DataTypes) => {
  const Seguros = sequelize.define('Seguros', {
    c_tipo_select2                       : {
      type   : DataTypes.STRING,
      unique : true
    },
    c_tipo_campo_valor                       : {
      type   : DataTypes.STRING,
      unique : true
    },
    c_valor_exhibir                       : {
      type   : DataTypes.STRING,
      unique : true
    },
    n_id_moneda      : DataTypes.INTEGER,
    n_valor          : DataTypes.FLOAT,
    b_activo         : DataTypes.BOOLEAN,
  }, {
    tableName: 'Seguros',
  });

  Seguros.associate = (models) => {

    Seguros.belongsTo(models.Monedas, {
      foreignKey : 'n_id_moneda',
      as         : 'moneda'
    });
    
  };


  return Seguros;
};