'use strict';

const Controller = require('egg').Controller;


const errorTypes = require('../constant/errorTypes')


// 获取问题列表数据校验规则
const questionListRule = {
  pageNum: {
    type: 'int',
    min: 1
  },
  pageSize: {
    type: 'int',
    min: 1
  }
}

// 添加问题数据校验规则
const addQuestionRule = {
  userId: {
    type: 'int'
  },
  title: {
    type: 'string',
  }
}

class QuestionController extends Controller {
  // 分页获取问题列表数据
  async index() {
    // 1.参数校验
    this.ctx.validate(questionListRule, this.ctx.request.body)

    // 2.解构参数
    const { pageNum, pageSize } = this.ctx.request.body

    // 3.获取问题列表分页数据
    const questions = await this.ctx.service.question.getQuestionList((pageNum - 1) * pageSize, pageSize)

    // 4.响应数据
    this.ctx.helper.success(200, questions, '获取问题列表数据成功。')
  }

  // 发表问题
  async create() {
    const { ctx } = this
    // 1.参数校验
    ctx.validate(addQuestionRule, ctx.request.body)

    // 2.解构参数
    const { userId, title } = ctx.request.body

    // 3.查看问题是否已存在
    const question = await ctx.service.question.checkQuestionAlreadyExists(title)

    // 4.响应数据
    if (question.length > 0) {
      // 问题已存在
      ctx.helper.success(409, question, '问题已存在。')
    } else {
      // 问题不存在
      try {
        await ctx.service.question.createQuestion(userId, title)
      } catch (error) {
        ctx.throw(500, errorTypes.DATABASE_ERROR)
      }
      ctx.helper.success(201, null, '发表问题成功。')
    }
  }
}

module.exports = QuestionController;
