'use strict';
const path = require('path')

const Controller = require('egg').Controller;

const errorTypes = require('../constant/errorTypes')

class FileController extends Controller {
  // 上传头像
  async uploadAvatar() {
    // 1.获取上传的文件信息
    const file = this.ctx.request.files[0]
    const extname = path.extname(file.filepath)
    console.log(file);
    // 2.判断是否为规定格式的图片
    console.log(extname);
    if (!(['.jpg', '.jpeg', '.png'].includes(extname))) {
      // 请求资源格式错误
      await this.ctx.cleanupRequestFiles();  // 删除对应临时文件夹中的文件
      this.ctx.throw(406, errorTypes.RESOURCES_TYPE_ERROR)
    }

    // 3.返回响应
    let avatarInfo = {
      fileName: file.filename,
      mimeType: file.mimeType,
      filePath: file.filepath
    }
    this.ctx.helper.success(201, avatarInfo, '上传头像成功。')
  }

  // 设置用户头像
  async saveAvatar() {
    // 1.获取文件名和mimeType
    const { fileName, mimeType } = this.ctx

    // 2.入库avatars表
    await this.service.avatar.create(fileName, mimeType, this.ctx.userId)

    // 3.入库用户表
    const { appHost, appPort } = this.config.appConstant
    const avatarUrl = `${appHost}:${appPort}/users/${this.ctx.userId}/avatar`
    await this.service.avatar.saveAvatarInfo(avatarUrl, this.ctx.userId)

    // 4.返回响应
    this.ctx.helper.success(200, { avatarUrl }, '设置用户头像成功。')
  }
}

module.exports = FileController;
