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

// 问题详情数据校验规则
const questionDetailRule = {
  id: {
    type: 'int'
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

  // 问题详情
  async show() {
    // 1.获取参数
    const { id } = this.ctx.params

    // 2.查库获取数据
    const [result] = await this.service.question.getQuestionById(id)
    result.user = JSON.parse(result.user)
    result.labels = JSON.parse(result.labels)

    // 3.响应 
    this.ctx.helper.success(200, result, '获取问题详情成功。')
  }

  // 给问题添加标签
  async addLabels() {
    // 1.获取参数
    const { id } = this.ctx.params
    const labels = this.ctx.labels

    // 2.判断问题是否已经包含该标签
    for (const label of labels) {
      const result = await this.ctx.service.question.relationshipBetweenQuestion2Label(id, label.id)
      if (!result) {
        // 不包含，添加到关系表
        const res = await this.ctx.service.question.addLabel(id, label.id)
      }
    }

    // 3.返回响应
    this.ctx.helper.success(201, null, '添加标签成功。')
  }
}

module.exports = QuestionController;
