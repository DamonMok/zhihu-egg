'use strict';

const Controller = require('egg').Controller;

class AuthController extends Controller {
  async login() {
    const { ctx } = this
    const { userName, password } = ctx.request.body
    ctx.body = `${userName}: ${password}`
  }
}

module.exports = AuthController;
