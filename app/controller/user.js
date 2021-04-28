'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async register() {
    const { ctx } = this
    let { userName, password } = ctx.request.body
    password = ctx.helper.handlePassword(password)


    ctx.body = `${userName}: ${password}`
  }
}

module.exports = UserController;
