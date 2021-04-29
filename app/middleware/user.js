const errorTypes = require('../constant/errorTypes')


const registerRule = {
  userName: {
    type: 'string',
    format: /^[a-zA-Z0-9_]{4,16}$/  // 4-16位数字字母下划线
  },
  password: {
    type: 'string',
    format: /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-_*/+.~!@#$%^&*()]{6,20}$/ // 至少包含数字跟字母，可以有字符，长度6-20
  }
}

// 用户注册前验证
const verifyLogin = async (ctx, next) => {
  // 1.参数校验
  ctx.validate(registerRule, ctx.request.body)
  const { userName } = ctx.request.body

  // 2.判断用户是否已存在
  const users = await ctx.service.user.getUserByUserName(userName)
  if (users.length > 0) ctx.throw(409, errorTypes.USER_ALREADY_EXISTS)

  await next()
}

module.exports = {
  verifyLogin
}