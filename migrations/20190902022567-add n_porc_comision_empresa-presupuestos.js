module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'Presupuestos',
        'n_porc_comision_empresa',
        {
          type: Sequelize.FLOAT,
          allowNull: false,
          defaultValue:15,
        },
      );
  },

  down(queryInterface) {
    return queryInterface.removeColumn('Presupuestos', 'n_porc_comision_empresa');
  },
};