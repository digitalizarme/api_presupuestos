
module.exports = (res, res_total) => {

  return {items:res,total:res_total[0].dataValues.total}
}
