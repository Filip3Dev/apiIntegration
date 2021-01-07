'use strict';

const md5 = require('md5');
const crypto = require('crypto');
const authService = require('../../utils/auth');
const Users = require("../../models/User");
const mailer = require('../../utils/mailer');
const payment = require('../../utils/payment');

exports.receiveData = async ctx => {
  console.log(ctx.request.body);
  // const token = ctx.headers['x-access-token'];
  // const data = await authService.decodeToken(token);

  // const user = await Users.findById(data.id, '-password -_id -__v');
  // ctx.assert(user, 404, "The requested user doesn't exist");
  ctx.status = 200;
  ctx.body = {};
};
