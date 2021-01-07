"use strict";
const path = require("path");
const nodemailer = require("nodemailer");
var hbs = require('nodemailer-express-handlebars');

const transport = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 465,
  auth: {
    user: "apikey",
    pass: "SG.AVvElRTRQTuE-EicsPHlyQ.iFGAGnkgsk_gRsP3gdk86ALfQ5fbFw8ij6wmiJR85nQ"
  }
});

const options = {
  viewEngine: {
    extname: '.hbs',
    layoutsDir: './html/mail/',
    partialsDir: './html/mail/'
  },
  viewPath: './html/mail/',
  extName: '.html'
};

transport.use("compile", hbs(options));

module.exports = transport;
