'use strict';

module.exports = (sequelize, DataTypes) => {
  const Cotizaciones = sequelize.define('Cotizaciones', {
    c_monedaOrigemDestino : DataTypes.STRING,
    n_valor               : DataTypes.FLOAT,

  }, {
    tableName: 'Cotizaciones',
  });
  return Cotizaciones;
};