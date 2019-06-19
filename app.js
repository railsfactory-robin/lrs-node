require('dotenv').config({})
const Koa = require('koa');
const cors = require('@koa/cors');
const app = new Koa();
const Router = require('koa-router')
const router = new Router()
const bodyParser = require('koa-bodyparser');
const userController = require('./controllers/userController');
const errorController = require('./controllers/errorController');

// const Sentry = require('@sentry/node');

// Sentry.init({ dsn: 'https://c14da086f7fb41b0847131c577d09b45@sentry.io/1478417' });


router.use('/users', userController.routes())
router.use('/error', errorController.routes())

app.use(bodyParser());

app
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())

module.exports = app