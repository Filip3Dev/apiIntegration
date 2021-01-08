"use strict";
const cron = require('node-cron');
const integration = require('../api/integration/integration.controller');


exports.startCron = async () => {
    console.log("Starting...")
    const timer = cron.schedule('* * * * *',  () => {
        integration.loadData();
    }, {
        scheduled: true,
        timezone: "America/Sao_Paulo"
    });
    timer.start();
    return true;
};