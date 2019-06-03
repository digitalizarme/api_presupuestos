
module.exports = () => {
  const fecha = new Date();
  let mes = fecha.getUTCMonth()+1;
  mes = mes<10?"0"+ mes:mes;
  let dia = fecha.getUTCDate();
  dia = dia<10?"0"+ dia:dia;

  return fecha.getUTCFullYear()+"-"+mes+"-"+dia;
}
