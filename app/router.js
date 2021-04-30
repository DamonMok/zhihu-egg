'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.resources('/user', app.middleware.user.verifyRegister, controller.user);
  router.post('/login', app.middleware.user.verifyLogin, controller.auth.login)
};
