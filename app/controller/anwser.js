'use strict';

const Controller = require('egg').Controller;


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
}

module.exports = AnwserController;
