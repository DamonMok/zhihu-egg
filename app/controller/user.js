'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async register() {
    const { ctx } = this
    const { userName, password } = ctx.request.body
    ctx.body = `${userName}: ${password}`
  }
}

module.exports = UserController;
