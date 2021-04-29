'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.resources('/user', app.middleware.user.verifyLogin, controller.user);
  router.post('/login', controller.auth.login)
};
