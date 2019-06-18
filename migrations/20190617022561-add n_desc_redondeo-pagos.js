module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'Pagos',
        'n_desc_redondeo',
        {
          type: Sequelize.FLOAT,
          defaultValue:0
        },
      );
  },

  down(queryInterface) {
    return queryInterface.removeColumn('Pagos', 'n_desc_redondeo');
  },
};