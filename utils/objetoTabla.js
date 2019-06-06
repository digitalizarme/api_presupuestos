
module.exports = (res, res_total) => {
  return {items:res,total:res_total && res_total.length>0 && typeof res_total[0].dataValues !== "undefined" && typeof res_total[0].dataValues.total === "number" ?res_total[0].dataValues.total:res_total.length}
}
