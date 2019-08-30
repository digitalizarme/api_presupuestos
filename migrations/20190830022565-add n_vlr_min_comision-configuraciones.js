module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'Configuraciones',
        'n_valor_min_comision',
        {
          type: Sequelize.FLOAT,
          allowNull: false,
          defaultValue:0,
        },
      );
  },

  down(queryInterface) {
    return queryInterface.removeColumn('Configuraciones', 'n_valor_min_comision');
  },
};