module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'Presupuestos',
        'c_recebido_por',
        {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      );
  },

  down(queryInterface) {
    return queryInterface.removeColumn('Presupuestos', 'c_recebido_por');
  },
};