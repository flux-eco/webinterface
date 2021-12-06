import { info } from "console";
import winston, { level } from "winston";

let date = new Date().toDateString();
const logFormat = winston.format.printf(function(info) {
  return `[${date} - ${info.level}][${info.component}]${info.event ? '[' + info.event + ' ' + info.eventId + ']' : ''}: ${JSON.stringify(info.message, null, 4)}`;
});

winston.addColors({
    trace: 'magenta',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    debug: 'blue',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    error: 'red'
});

export default winston.createLogger({
    levels: {
        trace: 0,
        input: 1,
        verbose: 2,
        prompt: 3,
        debug: 4,
        info: 5,
        data: 6,
        help: 7,
        warn: 8,
        error: 9
    },
    transports: [
        new winston.transports.Console({
            level: level,
            format: winston.format.combine(winston.format.colorize(), logFormat)
        }),
        new winston.transports.File({filename: 'error.log', level: 'error'}),
        new winston.transports.File({filename: 'combined.log'})
    ]
})