module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'Pagos',
        'n_nr_cuota',
        {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
      );
  },

  down(queryInterface) {
    return queryInterface.removeColumn('Pagos', 'n_nr_cuota');
  },
};