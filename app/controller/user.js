'use strict';
const Controller = require('egg').Controller;

const errorTypes = require('../constant/errorTypes')


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

    ctx.throw(409, errorTypes.USER_ALREADY_EXISTS)

    ctx.body = `${userName}: ${password}`
  }
}

module.exports = UserController;
