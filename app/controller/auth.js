'use strict';

const Controller = require('egg').Controller;

class AuthController extends Controller {
  async login() {
    const { ctx, app } = this
    const { id, userName } = ctx.user
    const { secret, expiresIn } = app.config.jwt

    // jwt生成token
    const token = app.jwt.sign({
      id, userName
    }, secret, {
      expiresIn
    })

    // 返回响应
    ctx.helper.success(200, { id, userName, token }, '用户登录成功!')

  }
}

module.exports = AuthController;
