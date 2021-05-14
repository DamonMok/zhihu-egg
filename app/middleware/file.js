const fs = require('fs')
const path = require('path')

const pump = require('mz-modules/pump')


// 处理头像(临时文件夹->正式文件夹)
const handleAvatar = async function (ctx, next) {
  // 1.获取头像路径
  const { avatarPath } = ctx.request.body

  // 2.把头像从临时文件夹写入到 uploads/avatars 文件夹
  const fileName = path.basename(avatarPath)  // 文件名
  const targetPath = path.join(ctx.app.config.baseDir, 'app/uploads/avatars', fileName)  // 保存路径
  const source = fs.createReadStream(avatarPath)
  const target = fs.createWriteStream(targetPath)

  try {
    // 写入文件夹
    await pump(source, target)
  } finally {
    ctx.fileName = fileName
    ctx.mimeType = ctx.request.body.mimeType
    await next()
  }
}

module.exports = {
  handleAvatar
}