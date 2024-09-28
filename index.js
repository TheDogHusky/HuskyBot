const Client    = require('./Utils/HuskyBot');
const HuskyBot  = new Client();

HuskyBot.init();


// Error handling
process.on('unhandledRejection', error => {
    HuskyBot.logger.error(`Unhandled rejection: ${error.stack}`, "unhandledRejection");
});
process.on('uncaughtException', error => {
    HuskyBot.logger.error(`Uncaught exception: ${error.stack}`, "uncaughtException");
});
process.on('uncaughtExceptionMonitor', error => {
    HuskyBot.logger.error(`Uncaught exception: ${error.stack}`, "uncaughtExceptionMonitor");
});