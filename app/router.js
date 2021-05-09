'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 用户(注册、)
  router.post('/users', app.middleware.user.verifyRegister, controller.user.create);
  router.get('/users', controller.user.index)

  // 用户(登录)
  router.post('/login', app.middleware.user.verifyLogin, controller.auth.login)

  // 问题
  router.get('/questions', controller.question.index)  // 列表
  router.post('/questions', app.middleware.auth.verifyToken, controller.question.create)  // 发表问题

  // 答案
  router.get('/answers', controller.anwser.index)  // 列表
  router.post('/answers', app.middleware.auth.verifyToken, controller.anwser.create)  // 发表答案

};
