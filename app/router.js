'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 用户(注册、列表)
  router.post('/users', app.middleware.user.verifyRegister, controller.user.create);
  router.get('/users', app.middleware.auth.verifyToken, controller.user.index)

  // 用户(登录)
  router.post('/login', app.middleware.user.verifyLogin, controller.auth.login)

  // 问题
  router.get('/questions', controller.question.index)  // 列表
  router.post('/questions', app.middleware.auth.verifyToken, controller.question.create)  // 发表问题
  router.get('/questions/:id', app.middleware.auth.verifyToken, controller.question.show)  // 问题详情
  router.post('/questions/:id/labels', app.middleware.question.verifyLabels, controller.question.addLabels)

  // 答案
  router.get('/answers', controller.anwser.index)  // 列表
  router.post('/answers', app.middleware.auth.verifyToken, controller.anwser.create)  // 发表答案

  // 标签
  router.post('/label', app.middleware.auth.verifyToken, controller.label.create)  // 新增标签

  // 文件
  router.post('/upload/avatar', app.middleware.auth.verifyToken, controller.file.uploadAvatar)  // 上传用户头像
  router.post('/users/:userId/avatar', app.middleware.auth.verifyToken, app.middleware.file.handleAvatar, controller.file.saveAvatar)  // 设置头像

};
