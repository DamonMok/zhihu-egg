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

  /**
   * 获取问题详情
   * @param {问题id} id 
   * @returns 
   */
  async getQuestionById(id) {
    const statement = `
      SELECT 
        q.title, q.createAt,
        JSON_OBJECT('id', u.id, 'name', u.nickName) user,
        JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name)) labels
      FROM questions q 
      LEFT JOIN users u ON u.id = q.user_id
      LEFT JOIN question_label ql ON q.id = ql.question_id
      LEFT JOIN labels l ON ql.label_id = l.id 
      WHERE q.id = ?;  
    `

    const result = await this.app.mysql.query(statement, [id])
    return result
  }

  /**
   * 判断问题是否已经包含该标签
   * @param {问题id} questionId 
   * @param {标签id} labelId 
   * @returns 
   */
  async relationshipBetweenQuestion2Label(questionId, labelId) {
    const statement = 'SELECT * FROM question_label WHERE question_id = ? AND label_id = ?;'
    const [result] = await this.app.mysql.query(statement, [questionId, labelId])
    return result
  }


  async addLabel(questionId, labelId) {
    const statement = 'INSERT INTO question_label (question_id, label_id) VALUES (?, ?);'
    return await this.app.mysql.query(statement, [questionId, labelId])
  }
}

module.exports = QuestionService;
