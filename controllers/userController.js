var Router = require('koa-router');
var router = new Router();
const Validator = require('jsonschema').Validator;
const v = new Validator();

const schema = {
  "type": "object", properties: {
    username: { type: "string" }
  },
  "required": ["username"]
};

const { getAllUsers, createUser, updateUser, deleteUser, getUserById } = require('../services/userService')

const schemaCheck = async (ctx, next) => {
  console.log(v.validate(ctx.request.body, schema))
  if (v.validate(ctx.request.body, schema).valid) {
    await next()
  } else {
    ctx.status = 400
    ctx.body = {
      message: "Schema Error"
    }
  }
}

router.get('/', async (ctx) => {
  const users = await getAllUsers()
  ctx.status = 200
  ctx.body = {
    users: users
  }
})

router.get('/:id', async (ctx) => {
  ctx.body = {
    users: await getUserById(ctx.params.id)
  }
})

router.post('/', schemaCheck, async (ctx) => {
  console.log(ctx.request.body)
  ctx.body = {
    user: await createUser(ctx.request.body)
  }
})

router.put('/:id', async (ctx) => {
  ctx.body = {
    user: await updateUser(ctx.params.id, ctx.request.body)
  }
})

router.del('/:id', async (ctx) => {
  ctx.body = {
    data: await deleteUser(ctx.params.id)
  }
})

module.exports = router;