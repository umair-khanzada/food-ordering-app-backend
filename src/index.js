const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

let server;
mongoose
  .connect(
    process.env.DB_URI ||
      'mongodb+srv://food-app-amdin:qzd8!GfgevTr28M@cluster0.c5kih.mongodb.net/food-ordering-app?retryWrites=true&w=majority',
    config.mongoose.options
  )
  .then(() => {
    logger.info('Connected to MongoDB');
    server = app.listen(config.port, '0.0.0.0', () => {
      logger.info(`Listening to port ${config.port}`);
    });
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
