'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 用户(注册、)
  router.resources('/user', app.middleware.user.verifyRegister, controller.user);

  // 用户(登录)
  router.post('/login', app.middleware.user.verifyLogin, controller.auth.login)

  // 问题(列表)
  router.resources('/question', controller.question)
};
