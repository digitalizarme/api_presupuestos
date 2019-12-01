module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'Presupuestos',
        'b_entregue',
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue:false,
        },
      );
  },

  down(queryInterface) {
    return queryInterface.removeColumn('Presupuestos', 'b_entregue');
  },
};