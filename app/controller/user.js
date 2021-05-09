'use strict';
const Controller = require('egg').Controller;

const errorTypes = require('../constant/errorTypes')


// 获取用户列表数据校验规则
const userListRule = {
  pageNum: {
    type: 'int',
    min: 1
  },
  pageSize: {
    type: 'int',
    min: 1
  }
}

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

  /**
   * 用户列表
   */
  async index() {

    // 1.校验数据
    this.ctx.validate(userListRule, this.ctx.request.body)

    // 2.获取页码、条数请求参数
    const { pageNum, pageSize } = this.ctx.request.body

    // 3.查询数据库
    const users = await this.service.user.getUserList((pageNum - 1) * pageSize, pageSize)

    // 4.返回响应
    this.ctx.helper.success(200, users, '获取用户列表成功。')
  }
}

module.exports = UserController;
