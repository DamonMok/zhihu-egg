'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  /**
   * 根据用户名判断用户是否存在
   * @param {用户名} userName 
   * @returns 用户列表
   */
  async getUserByUserName(userName) {
    const statement = 'SELECT * FROM `users` WHERE userName = ?;'
    const [result] = await this.ctx.app.mysql.query(statement, [userName])

    return result
  }

  /**
   * 把新注册的用户添加到数据库
   * @param {用户名} userName 
   * @param {密码} password 
   * @returns 
   */
  async create(userName, password) {
    const statement = 'INSERT INTO `users` (nickName, userName, password) VALUES (?, ?, ?);'
    const [result] = await this.ctx.app.mysql.query(statement, [userName, userName, password])

    return result
  }

  /**
   * 获取用户列表
   * @param {偏移量} offset 
   * @param {每页多少条} size 
   * @returns 
   */
  async getUserList(offset, size) {
    const statement = 'SELECT * FROM `users` LIMIT ?, ?;'
    const result = await this.ctx.app.mysql.query(statement, [offset, size])

    return result
  }
}

module.exports = UserService;
