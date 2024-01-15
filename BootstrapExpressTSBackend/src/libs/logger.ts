import winston, { format } from 'winston';
import 'winston-daily-rotate-file';

const logDir = 'logs';

type LoggerCallback = (
    error?: unknown,
    level?: string,
    message?: string,
    meta?: unknown
) => void;

interface LoggerMethod {
    (message: string, callback: LoggerCallback): void;
    (message: string, meta: unknown, callback: LoggerCallback): void;
    (message: string, ...meta: unknown[]): void;
    (message: unknown): void;
    (infoObject: object): void;
}

interface Logger {
    error : LoggerMethod;
    warn: LoggerMethod;
    info : LoggerMethod;     
}

// Log Transports
const dailyErrorLogFile = new winston.transports.DailyRotateFile({
    level: 'error',
    filename: `${logDir}/server-errors-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false,
    maxFiles: '30d',
});

const consoleLog = new winston.transports.Console({
    format: winston.format.simple(),
});

const dailyLogFile = new winston.transports.DailyRotateFile({
    level: 'info',
    filename: `${logDir}/server-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false,
    maxFiles: '30d'
});

class DefaultLogger implements Logger {
    readonly logger : winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: format.combine(
                format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                format.json()
            ),
            defaultMeta: { service: 'user-service' },
            transports: [
                dailyErrorLogFile
            ],
        });

        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(consoleLog);
            this.logger.add(dailyLogFile);
        }
    }

    public error(...args : unknown[])  {
        
        this.logger.error(args);
    };

    public warn(...args : unknown[]) {
        this.logger.warn(args);
    };

    public info(...args : unknown[]) {
        this.logger.info(args);
    };
}

export const logger = new DefaultLogger() as Logger;
