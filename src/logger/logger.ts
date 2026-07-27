import pino, { TransportTargetOptions, type DestinationStream } from 'pino';

const pinoFileTransportOptions: TransportTargetOptions = {
  target: 'pino/file',
  level: process.env.PINO_LOG_LEVEL || 'info',
  options: {
    destination: process.env.PINO_LOG_FILE || 'logs/app.log',
  },
};

const pinoConsoleTransportOptions: TransportTargetOptions = {
  target: 'pino-pretty',
  level: process.env.PINO_LOG_LEVEL || 'info',
  options: {
    destion: 1, // 1 is stdout
  },
};

const getTransportTargetOptions = (): TransportTargetOptions[] => {
  const transportTargetOptions: TransportTargetOptions[] = [];
  if (process.env.PINO_LOG_FILE?.toLocaleLowerCase() === 'true') {
    transportTargetOptions.push(pinoFileTransportOptions);
  }
  if (process.env.PINO_LOG_CONSOLE?.toLocaleLowerCase() === 'true') {
    transportTargetOptions.push(pinoConsoleTransportOptions);
  }
  return transportTargetOptions;
};

const transports: DestinationStream = pino.transport({
  targets: getTransportTargetOptions(),
});

export default pino(
  { level: process.env.PINO_LOG_LEVEL || 'info', timestamp: pino.stdTimeFunctions.isoTime },
  transports,
);
