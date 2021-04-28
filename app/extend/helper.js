const crypto = require('crypto')

// 密码加密
const handlePassword = (password) => {
  return crypto.createHash('md5').update(password).digest('hex')
}

module.exports = {
  handlePassword,
}