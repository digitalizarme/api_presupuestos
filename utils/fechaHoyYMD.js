
module.exports = () => {
  const fecha = new Date();
  let mes = fecha.getMonth()+1;
  mes = mes<10?"0"+ mes:mes;
  let dia = fecha.getDate();
  dia = dia<10?"0"+ dia:dia;

  return fecha.getFullYear() + "-" + mes + "-" + dia;
}
