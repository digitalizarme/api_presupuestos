'use strict';

module.exports = (sequelize, DataTypes) => {
  const Presupuestos = sequelize.define('Presupuestos', {
    n_id_persona              : DataTypes.INTEGER,
    n_id_usuario              : DataTypes.INTEGER,
    n_id_flete                : DataTypes.INTEGER,
    n_id_persona_comisionista : DataTypes.INTEGER,
    n_porc_comisionista       : DataTypes.FLOAT,
    n_id_seguro               : DataTypes.INTEGER,
    n_id_status               : DataTypes.INTEGER,
    n_id_moneda               : DataTypes.INTEGER,
    n_tipo_flete_valor        : DataTypes.FLOAT,
    n_valor_flete             : DataTypes.FLOAT,
    n_desc_redondeo           : DataTypes.FLOAT,
    n_valor_comision          : DataTypes.FLOAT,
    n_tipo_seguro_valor       : DataTypes.FLOAT,
    n_valor_seguro            : DataTypes.FLOAT,
    n_cotizacion              : DataTypes.FLOAT,
    n_dias_entrega            : DataTypes.INTEGER,
    n_cuotas_pago             : DataTypes.INTEGER,
    n_dias_Frecuencia_pago    : DataTypes.INTEGER,
    t_observacion             : DataTypes.TEXT,
    n_total                   : DataTypes.VIRTUAL,
    
  }, {
    tableName: 'Presupuestos',
  });

  Presupuestos.associate = (models) => {

    Presupuestos.belongsTo(models.Personas, {
      foreignKey : 'n_id_persona',
      as         : 'persona'
    });
    
    Presupuestos.belongsTo(models.Usuarios, {
      foreignKey : 'n_id_usuario',
      as         : 'usuario'
    });
    
    Presupuestos.belongsTo(models.Fletes, {
      foreignKey : 'n_id_flete',
      as         : 'flete'
    });
    
    Presupuestos.belongsTo(models.Personas, {
      foreignKey : 'n_id_persona_comisionista',
      as         : 'comisionista'
    });
    
    Presupuestos.belongsTo(models.Seguros, {
      foreignKey : 'n_id_seguro',
      as         : 'seguro'
    });
    
    Presupuestos.belongsTo(models.Status, {
      foreignKey : 'n_id_status',
      as         : 'status'
    });
    
    Presupuestos.belongsTo(models.Monedas, {
      foreignKey : 'n_id_moneda',
      as         : 'moneda'
    });
                
    
  };
  
  return Presupuestos;
};