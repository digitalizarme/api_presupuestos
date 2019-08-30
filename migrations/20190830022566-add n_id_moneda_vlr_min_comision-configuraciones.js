module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'Configuraciones',
        'n_id_moneda_valor_min_comision',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue:1,
        },
      );
  },

  down(queryInterface) {
    return queryInterface.removeColumn('Configuraciones', 'n_id_moneda_valor_min_comision');
  },
};