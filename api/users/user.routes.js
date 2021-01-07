'use strict';

const controller = require('./user.controller');
const authService = require('../../utils/auth');

module.exports = Router => {
  const router = new Router({
    prefix: `/users`,
  });

  router
    .post('/', controller.createOne)
    .post('/login', controller.authenticate)
    .get('/self', authService.authorize, controller.getSelf);

  return router;
};
