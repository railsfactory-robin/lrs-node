var Router = require('koa-router');
var router = new Router();
const { createErrorLogs } = require('../services/errorService')

router.post('/', async (ctx) => {
  let data = {
    user: "Robin Thomas",
    date: '17/06/2019'
  }
  ctx.body = {
    error_id: await createErrorLogs(ctx.request.body, data)
  }
})

module.exports = router;