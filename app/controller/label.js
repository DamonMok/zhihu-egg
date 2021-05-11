'use strict';

const Controller = require('egg').Controller;

const errorTypes = require('../constant/errorTypes')


const labelRule = {
  name: {
    type: 'string'
  }
}

class LabelController extends Controller {
  /**
   * 创建标签
   */
  async create() {
    // 1.参数校验
    this.ctx.validate(labelRule, this.ctx.request.body)

    // 2.获取参数
    const { name } = this.ctx.request.body

    // 3.判断标签是否已经存在
    const labels = await this.service.label.getLabelByName(name)

    // 4.标签已存在
    if (labels.length > 0) this.ctx.throw(409, errorTypes.LABEL_ALREADY_EXISTS)

    // 5.标签不存在，入库
    const result = await this.service.label.createLabelByName(name)

    // 6.返回响应
    this.ctx.helper.success(201, null, "创建标签成功。")
  }
}

module.exports = LabelController;
