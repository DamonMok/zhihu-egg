'use strict';

const Service = require('egg').Service;

class AnswerService extends Service {
  /**
   * 获取答案列表数据
   * @param {偏移量} offset 
   * @param {每页多条条} size 
   * @returns 
   */
  async getAnswerList(offset, size) {
    const statement = 'SELECT * FROM `answers` LIMIT ?, ?;'
    const result = await this.ctx.app.mysql.query(statement, [offset, size])

    return result
  }
}

module.exports = AnswerService;
