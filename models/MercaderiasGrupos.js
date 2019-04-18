'use strict';

module.exports = (sequelize, DataTypes) => {
  const MercaderiasGrupos = sequelize.define('MercaderiasGrupos', {
    c_descripcion                       : {
      type   : DataTypes.STRING,
      unique : true
    },
    n_id_flete      : DataTypes.INTEGER,
    b_activo        : DataTypes.BOOLEAN,
  }, {
    tableName: 'MercaderiasGrupos',
  });

  MercaderiasGrupos.associate = (models) => {

    MercaderiasGrupos.belongsTo(models.Fletes, {
      foreignKey : 'n_id_flete',
      as         : 'flete'
    });
    
  };
  
  return MercaderiasGrupos;
};