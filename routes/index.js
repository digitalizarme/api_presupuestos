module.exports = (app, router) => {
  require('./serviciosGrupos.js')(app, router)
  require('./cotizaciones.js')(app, router)
  require('./usuarios.js')(app, router)
  require('./personas.js')(app, router)
  require('./acceder.js')(app, router)
  require('./generico.js')(app, router)
  require('./configuraciones.js')(app, router)
};
