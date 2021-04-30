const errorTypes = require('../constant/errorTypes')


// 使用jwt对登录鉴权
const verifyToken = async (ctx, next) => {

  // 1.获取前端请求头的token
  const secret = ctx.app.config.jwt.secret
  const token = ctx.request.header.authorization.replace('Bearer ', '')

  // 2.解析token中的数据
  try {
    const data = ctx.app.jwt.verify(token, secret)
  } catch (error) {
    // token过期/无效
    ctx.throw(401, errorTypes.UNAUTHORIZED)
  }

  await next()
}

module.exports = {
  verifyToken
}