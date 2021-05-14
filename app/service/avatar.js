'use strict';

const Service = require('egg').Service;

class AvatarService extends Service {
  /**
   * 新增头像
   * @param {头像文件名}} fileName 
   * @param {文件类型} mimeType 
   * @param {用户id} userId 
   */
  async create(fileName, mimeType, userId) {
    const statement = 'INSERT INTO avatars (fileName, mimeType, user_id) VALUES (?, ?, ?);'
    return await this.app.mysql.query(statement, [fileName, mimeType, userId])
  }

  /**
   * 设置用户头像
   * @param {头像Url} avatarUrl 
   * @param {用户id} userId 
   * @returns 
   */
  async saveAvatarInfo(avatarUrl, userId) {
    const statement = 'UPDATE users SET avatarUrl = ? WHERE id = ?;'
    return await this.app.mysql.query(statement, [avatarUrl, userId])
  }
}

module.exports = AvatarService;
