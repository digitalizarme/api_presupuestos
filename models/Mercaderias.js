'use strict';

module.exports = (sequelize, DataTypes) => {
  const Mercaderias = sequelize.define('Mercaderias', {
    c_descripcion                       : {
      type   : DataTypes.STRING,
      unique : true
    },
    c_codigo        : DataTypes.STRING,
    c_unidad        : DataTypes.STRING,
    n_id_marca      : DataTypes.INTEGER,
    n_id_grupo      : DataTypes.INTEGER,
    n_id_subgrupo   : DataTypes.INTEGER,
    n_iva           : DataTypes.INTEGER,
    n_id_moneda     : DataTypes.INTEGER,
    n_costo         : DataTypes.FLOAT,
    n_venta         : DataTypes.FLOAT,
    n_peso          : DataTypes.FLOAT,
    b_activo        : DataTypes.BOOLEAN,
    t_observacion   : DataTypes.TEXT,
  }, {
    tableName: 'Mercaderias',
  });

  Mercaderias.associate = (models) => {

    Mercaderias.belongsTo(models.MercaderiasMarcas, {
      foreignKey : 'n_id_marca',
      as         : 'marca'
    });

    Mercaderias.belongsTo(models.MercaderiasGrupos, {
      foreignKey : 'n_id_grupo',
      as         : 'grupo'
    });

    Mercaderias.belongsTo(models.MercaderiasSubGrupos, {
      foreignKey : 'n_id_subgrupo',
      as         : 'subGrupo'
    });
    Mercaderias.belongsTo(models.Monedas, {
      foreignKey : 'n_id_moneda',
      as         : 'moneda'
    });
    
  };


  return Mercaderias;
};