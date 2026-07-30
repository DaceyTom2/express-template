import { config } from './config.js';
import logger from './logger/logger.js';
import { app } from './app.js';

const port = config.PORT;

app.listen(port, () => {
  logger.info({ port }, 'Server is running');
});
