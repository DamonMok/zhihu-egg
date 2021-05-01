'use strict';

const Controller = require('egg').Controller;


// 获取问题列表数据校验规则
const questionsRule = {
  pageNum: {
    type: 'int',
    min: 1
  },
  pageSize: {
    type: 'int',
    min: 1
  }
}

class QuestionController extends Controller {
  // 分页获取问题列表数据
  async index() {
    // 1.参数校验
    this.ctx.validate(questionsRule, this.ctx.request.body)

    // 2.结构参数
    const { pageNum, pageSize } = this.ctx.request.body

    // 3.获取问题列表分页数据
    const questions = await this.ctx.service.question.getQuestionList((pageNum - 1) * pageSize, pageSize)

    // 4.响应数据
    this.ctx.helper.success(200, questions, '获取问题列表数据成功。')
  }
}

module.exports = QuestionController;
