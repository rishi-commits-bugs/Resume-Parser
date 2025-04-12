type LogLevel = 'info' | 'error' | 'warn' | 'debug';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
}

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data
    };
  }

  info(message: string, data?: any) {
    const entry = this.formatMessage('info', message, data);
    this.logs.push(entry);
    console.log(`[INFO] ${message}`, data || '');
  }

  error(message: string, data?: any) {
    const entry = this.formatMessage('error', message, data);
    this.logs.push(entry);
    console.error(`[ERROR] ${message}`, data || '');
  }

  warn(message: string, data?: any) {
    const entry = this.formatMessage('warn', message, data);
    this.logs.push(entry);
    console.warn(`[WARN] ${message}`, data || '');
  }

  debug(message: string, data?: any) {
    const entry = this.formatMessage('debug', message, data);
    this.logs.push(entry);
    console.debug(`[DEBUG] ${message}`, data || '');
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
  }
}

export const logger = Logger.getInstance(); 