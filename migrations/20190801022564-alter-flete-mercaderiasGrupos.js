module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.changeColumn('MercaderiasGrupos', 'n_id_flete', {
            type: Sequelize.INTEGER,
            allowNull: true,
        });
    },

    down(queryInterface, Sequelize) {
        return queryInterface.changeColumn('MercaderiasGrupos', 'n_id_flete', {
            type: Sequelize.INTEGER,
            allowNull: false,
        });
    }
};