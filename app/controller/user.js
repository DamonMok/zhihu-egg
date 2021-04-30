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
      const userId = result.insertId
      ctx.helper.success(201, userId, '注册用户成功。')
    } else {
      // 插入数据库失败
      ctx.throw(500, errorTypes.DATABASE_ERROR)
    }
  }
}

module.exports = UserController;
