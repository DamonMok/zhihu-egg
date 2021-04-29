'use strict';
const Controller = require('egg').Controller;

const errorTypes = require('../constant/errorTypes')


class UserController extends Controller {
  /**
   * 注册用户
   */
  async create() {
    const { ctx } = this

    let { userName, password } = ctx.request.body

    // 密码加密
    password = ctx.helper.handlePassword(password)

    // 新增用户到数据库
    const result = await ctx.service.user.create(userName, password)
    if (result.affectedRows === 1) {
      ctx.status = 201
      ctx.body = {
        user_id: result.insertId,
        meta: {
          status: 201,
          msg: "注册用户成功。"
        }
      }
    } else {
      ctx.throw()
    }
  }
}

module.exports = UserController;
