import { Module } from '@nestjs/common';

@Module({})
export class WinstonLoggerModule {}


import { createLogger, transports, format } from 'winston'


export const winstonLogger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(), 
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.timestamp(),
                format.colorize(),
                format.simple(),
            ),
        }),
        new transports.File({
            filename: 'error.log',
            level: 'error',
        }),
        new transports.File({ filename: 'combined.log' }),
    ],
});

