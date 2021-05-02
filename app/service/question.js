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

  /**
   * 判断问题是否已存在
   * @param {问题的标题} title 
   * @returns 
   */
  async checkQuestionAlreadyExists(title) {
    const statement = 'SELECT * FROM `questions` where title = ?;'
    return await this.app.mysql.query(statement, [title])

  }

  /**
   * 添加问题到数据库
   * @param {用户id} userId 
   * @param {问题标题} title 
   * @returns 
   */
  async createQuestion(userId, title) {
    const statement = 'INSERT INTO `questions` (user_id, title) values (?, ?);'
    return await this.app.mysql.query(statement, [userId, title])
  }
}

module.exports = QuestionService;
