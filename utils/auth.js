"use strict";
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.generateToken = async data => {
    return jwt.sign(data, process.env.SALT_KEY, { expiresIn: "24h" });
};

exports.decodeToken = async token => {
    var data = await jwt.verify(token, process.env.SALT_KEY);
    return data;
};

exports.authorize = function (ctx, next) {
    var token = ctx.query.token || ctx.headers["x-access-token"];

    if (!token) {
        ctx.status = 401
        ctx.body = { message: "Acesso Restrito" };
    } else {
        jwt.verify(token, process.env.SALT_KEY, function (error, decoded) {
            if (error) {
                ctx.status = 401
                ctx.body = { message: "Token Inválido" };
            } else {
                next();
            }
        });
    }
};