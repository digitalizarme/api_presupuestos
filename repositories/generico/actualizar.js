const { sequelize } = require('../../models');
const { fechaHoyUTC } = require('../../utils');
const moment = require('moment');
/**
 * update generic
 * */
module.exports = (param) => {
  const {table,column,valor,where_field,where_value} = param ;
  var hoy = moment.utc().format("YYYY-MM-DD HH:mm:ss.SSS +00:00");

  const SQL = `
  UPDATE \`${table}\`
  SET ${column} = '${valor}',updatedAt='${hoy}'
  WHERE
  ${where_field} = '${where_value}'

  `;
  return sequelize.query(SQL, { type: sequelize.QueryTypes.UPDATE });
};
