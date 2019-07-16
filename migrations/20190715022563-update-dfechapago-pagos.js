module.exports = {
  up: function (migration) {
    return migration.sequelize.query('ALTER TABLE public."Pagos" ALTER COLUMN d_fecha_pago TYPE date;');
  },
  down: function (migration) {
    return migration.sequelize.query('ALTER TABLE public."Pagos" ALTER COLUMN d_fecha_pago TYPE datetime;');
  }
};