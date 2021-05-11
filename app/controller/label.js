'use strict';

const Controller = require('egg').Controller;

class LabelController extends Controller {
  async create() {
    this.ctx.body = '新增标签'
  }
}

module.exports = LabelController;
