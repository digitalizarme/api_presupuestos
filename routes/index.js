module.exports = (app, router) => {
  require('./servicios_grupo.js')(app, router)
  require('./usuarios.js')(app, router)
  require('./personas.js')(app, router)
  require('./acceder.js')(app, router)
  require('./generico.js')(app, router)
};
