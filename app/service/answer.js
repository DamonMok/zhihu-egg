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

  /**
   * 添加答案到数据库
   * @param {用户id} userId 
   * @param {问题标题} title 
   * @returns 
   */
  async createAnswer(content, userId, questionId) {
    const statement = 'INSERT INTO `answers` (content, user_id, question_id) VALUES (?, ?, ?);'
    return await this.app.mysql.query(statement, [content, userId, questionId])
  }
}

module.exports = AnswerService;
