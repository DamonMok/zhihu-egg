const crypto = require('crypto')

// 密码加密
const handlePassword = (password) => {
  return crypto.createHash('md5').update(password).digest('hex')
}

/**
 * 请求成功返回响应
 * @param {响应码} status 
 * @param {返回的数据} data 
 * @param {提示信息} msg 
 */
const success = function (status, data, msg) {
  this.ctx.status = status
  this.ctx.body = {
    data,
    meta: {
      status,
      msg
    }
  }
}

module.exports = {
  handlePassword,
  success
}