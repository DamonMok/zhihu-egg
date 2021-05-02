'use strict';

const Controller = require('egg').Controller;

const errorTypes = require('../constant/errorTypes')


// 获取答案列表数据校验规则
const answersListRule = {
  pageNum: {
    type: 'int',
    min: 1
  },
  pageSize: {
    type: 'int',
    min: 1
  }
}

// 添加答案数据校验规则
const addAnswerRule = {
  content: {
    type: 'string',
  },
  userId: {
    type: 'int'
  },
  questionId: {
    type: 'int',
  }
}

class AnwserController extends Controller {
  // 分页获取答案列表数据
  async index() {
    // 1.校验参数
    this.ctx.validate(answersListRule, this.ctx.request.body)

    // 2.解构参数
    const { pageNum, pageSize } = this.ctx.request.body

    // 3.获取答案列表分页数据
    const answers = await this.ctx.service.answer.getAnswerList((pageNum - 1) * pageSize, pageSize)

    // 4.响应数据
    this.ctx.helper.success(200, answers, '获取答案列表数据成功。')
  }

  // 发表答案
  async create() {
    const { ctx } = this
    // 1.参数校验
    ctx.validate(addAnswerRule, ctx.request.body)

    // 2.解构参数
    const { content, userId, questionId } = ctx.request.body

    // 3.响应数据
    try {
      await ctx.service.answer.createAnswer(content, userId, questionId)
    } catch (error) {
      ctx.throw(500, errorTypes.DATABASE_ERROR)
    }

    // 4.响应数据
    ctx.helper.success(201, null, '发表答案成功。')
  }
}

module.exports = AnwserController;
