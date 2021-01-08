'use strict';

const md5 = require('md5');
const crypto = require('crypto');
const authService = require('../../utils/auth');
const Users = require("../../models/User");
const pipedrive = require('../../utils/pipedrive');

exports.receiveData = async ctx => {
  console.log(ctx.request.body);
  ctx.status = 200;
  ctx.body = {};
};

exports.loadData = async ctx => {
  console.log('Save into DB!');
  try {
      const response = await pipedrive.getAllDeals();
      console.log('response: ', response);
  } catch (error) {
      console.log('startCron: ', error);
  }
};
