'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 用户(注册、)
  router.resources('/users', app.middleware.user.verifyRegister, controller.user);

  // 用户(登录)
  router.post('/login', app.middleware.user.verifyLogin, controller.auth.login)

  // 问题
  router.get('/questions', controller.question.index)  // 列表
  router.post('/questions', app.middleware.auth.verifyToken, controller.question.create)  // 发表

  // 答案
  router.get('/answers', controller.anwser.index)  // 列表

};
