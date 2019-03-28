
module.exports = () => {
  const fecha = new Date();
  let mes = fecha.getMonth()+1;
  mes = mes<10?"0"+ mes:mes;
  return fecha.getFullYear() + "-" + mes + "-" + fecha.getDate();
}
