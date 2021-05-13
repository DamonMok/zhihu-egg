const labelsRule = {
  labels: {
    type: 'array',
  }
}


// 验证标签是否存在
const verifyLabels = async (ctx, next) => {
  // 1.参数校验
  ctx.validate(labelsRule, ctx.request.body)

  // 2.获取参数
  const { labels } = ctx.request.body

  // 3.查库判断标签是否存在【标签表】中
  const labelList = []
  for (const name of labels) {
    const label = { name }
    const [result] = await ctx.service.label.getLabelByName(name)
    if (!result) {
      // 把标签写入数据库库
      const res = await ctx.service.label.createLabelByName(name)
      label.id = res.insertId
    } else {
      // 记录标签的id
      label.id = result.id
    }
    labelList.push(label)
  }
  ctx.labels = labelList
  await next()
}

module.exports = {
  verifyLabels
}