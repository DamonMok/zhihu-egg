'use strict';

const Service = require('egg').Service;

class LabelService extends Service {
  /**
   * 根据标签名获取标签
   * @param {标签名} name 
   * @returns 
   */
  async getLabelByName(name) {
    const statement = 'SELECT * FROM `labels` WHERE name = ?;'
    const result = await this.app.mysql.query(statement, [name])
    return result
  }

  /**
   * 创建标签
   * @param {标签名} name 
   * @returns 
   */
  async createLabelByName(name) {
    const statement = 'INSERT INTO labels (name) VALUES (?);'
    const result = await this.app.mysql.query(statement, [name])
    return result
  }
}

module.exports = LabelService;
