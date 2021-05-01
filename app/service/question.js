'use strict';

const Service = require('egg').Service;

class QuestionService extends Service {
  /**
   * 获取问题列表数据
   * @param {偏移量} offset 
   * @param {每页多条条} size 
   * @returns 
   */
  async getQuestionList(offset, size) {
    const statement = 'SELECT * FROM `questions` LIMIT ?, ?;'
    const result = await this.ctx.app.mysql.query(statement, [offset, size])

    return result
  }
}

module.exports = QuestionService;
