'use strict';

const controller = require('./integration.controller');
// const authService = require('../../utils/auth');

module.exports = Router => {
  const router = new Router({
    prefix: `/integration`,
  });

  router
    .get('/', controller.receiveData)
    .post('/', controller.receiveData);

  return router;
};
