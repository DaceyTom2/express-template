import logger from './logger/logger.js';
import {app} from './app.js';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});