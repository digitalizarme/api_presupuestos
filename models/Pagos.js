'use strict';

module.exports = (sequelize, DataTypes) => {
  const Pagos = sequelize.define('Pagos', {
    n_id_presupuesto      : DataTypes.INTEGER,
    n_id_persona_baja     : DataTypes.INTEGER,
    n_id_medio_pago       : DataTypes.INTEGER,
    n_id_moneda           : DataTypes.INTEGER,
    n_nr_cuota            : DataTypes.INTEGER,
    n_valor               : DataTypes.FLOAT,
    n_desc_redondeo       : DataTypes.FLOAT,
    d_fecha_pago          : DataTypes.DATEONLY,
    d_fecha_vcto          : DataTypes.DATEONLY,
    t_observacion         : DataTypes.TEXT,
    n_recebido: {
      type: new DataTypes.VIRTUAL(DataTypes.FLOAT, ['n_valor','n_desc_redondeo']),
      get: function() {
        return this.get('n_valor') + this.get('n_desc_redondeo')
      }
    }  }, {
    tableName: 'Pagos',
  });

  Pagos.associate = (models) => {

    Pagos.belongsTo(models.Presupuestos, {
      foreignKey : 'n_id_presupuesto',
      as         : 'presupuesto'
    });
    Pagos.belongsTo(models.Personas, {
      foreignKey : 'n_id_persona_baja',
      as         : 'personaBaja'
    });
    Pagos.belongsTo(models.MediosPagos, {
      foreignKey : 'n_id_medio_pago',
      as         : 'medioPago'
    });
    Pagos.belongsTo(models.Monedas, {
      foreignKey : 'n_id_moneda',
      as         : 'moneda'
    });
    
  };
  
  return Pagos;
};