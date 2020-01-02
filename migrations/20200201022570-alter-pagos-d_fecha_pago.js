module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.changeColumn('Pagos', 'd_fecha_pago', {
            type: Sequelize.DATEONLY,
            allowNull: true,
        });
    },

    down(queryInterface, Sequelize) {
        return queryInterface.changeColumn('Pagos', 'd_fecha_pago', {
            type: Sequelize.DATE,
            allowNull: true,
        });
    }
};