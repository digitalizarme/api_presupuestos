'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Servicios_grupos = sequelize.define('Servicios_grupos', {
    c_descripcion:          DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      get: function() {
         return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY HH:mm:ss')
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get: function() {
         return moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY HH:mm:ss')
      }
    },

  }, {
    tableName: 'servicios_grupos',
  });
  return Servicios_grupos;
};