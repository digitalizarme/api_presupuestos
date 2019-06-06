
const Koa = require('koa');
const cors = require('@koa/cors');
const KoaRouter = require('koa-router');
const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');
const morgan = require('koa-morgan');
const pathToRegexp = require('path-to-regexp');
const app = new Koa();
const port = parseInt(process.env.PORT, 10) || 3000;

// Server Tasks
//require('./server-tasks/tasks')();

// routes
const router = KoaRouter();
require('./routes/index.js')(app, router);


// Koa
app.env = process.env.NODE_ENV;//|| 'development'
module.exports = app
  .use(cors())
  .use(morgan('[:date[clf]] :method :url [status: :status] [length: :res[content-length]] - :response-time ms'))
  .use(jwt({
    secret: process.env.JWT_KEY || 'Digitalizar.me API'
  }).unless({
    path: [
      '/',
      '/acceder',
      /^\/acceder\/verificaEmail\/.*/,
      '/configuraciones',
    ]
  }))
  .use(bodyParser({
    jsonLimit: '20mb'
  }))
  .use(async (context, next) => {
    try {
      await next();
    } catch (error) {
      console.log(error);
      context.body = {
        message   : error.message || 'Error en API',
        errorCode : error.errorCode || 500
      };
      context.status = error.status || 500;
    }
  })
  .use(router.routes())
  .use(async(context, next) => {
    context.body = 'Digitalizar.me API';
    return next();
  })
  .listen(port, () => {
    console.log('Server is up on port %s',port);
  });

  
  