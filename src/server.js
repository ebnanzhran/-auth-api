'use strict';

const express = require('express');

const notFound = require('./error/404');
const errorHandler = require('./error/500');
const logger = require('./api/middleware/logger');

const authRouter = require('./auth/routes');
const v2Router = require('./api/routes/v2');
const v1Router = require('./api/routes/v1');
const app = express();

app.use(express.json());

app.use(logger);

app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);
app.use(authRouter);

app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
};