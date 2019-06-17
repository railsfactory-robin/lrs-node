var Router = require('koa-router');
var router = new Router();
const { createErrorLogs } = require('../services/errorService')

router.post('/', async (ctx) => {
  ctx.body = {
    error_id: await createErrorLogs(ctx.request.body)
  }
})

module.exports = router;