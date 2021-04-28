'use strict';
const Controller = require('egg').Controller;


const registerRule = {
  userName: {
    type: 'string',
    required: true
  },
  password: {
    type: 'string',
    required: true
  }
}

class UserController extends Controller {
  async register() {
    const { ctx } = this
    ctx.validate(registerRule, ctx.request.body)

    let { userName, password } = ctx.request.body
    password = ctx.helper.handlePassword(password)

    // ctx.throw(422, '奇怪的错误')

    ctx.body = `${userName}: ${password}`
  }
}

module.exports = UserController;
