"use strict";

module.exports = (sequelize, DataTypes) => {
  const ItemsMercaderias = sequelize.define(
    "ItemsMercaderias",
    {
      c_descripcion: {
        type: DataTypes.STRING
      },
      n_id_presupuesto: DataTypes.INTEGER,
      n_cantidad: DataTypes.FLOAT,
      n_unitario: DataTypes.FLOAT,
      n_exentas: DataTypes.FLOAT,
      n_gravadas_5: DataTypes.FLOAT,
      n_gravadas_10: DataTypes.FLOAT,
      n_peso: DataTypes.FLOAT,
      n_flete: DataTypes.FLOAT,
      n_cotizacion: DataTypes.FLOAT,
      c_monedaOrigemDestino: DataTypes.STRING,
      b_seguro: DataTypes.BOOLEAN,
      t_observacion: DataTypes.TEXT
    },
    {
      tableName: "ItemsMercaderias"
    }
  );

  ItemsMercaderias.associate = models => {
    ItemsMercaderias.belongsTo(models.Presupuestos, {
      foreignKey: "n_id_presupuesto",
      as: "presupuesto"
    });
  };

  return ItemsMercaderias;
};
