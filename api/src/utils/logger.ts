import pino from "pino";

// redact sensitive fields anywhere in the object tree
// (tweak as needed)
const redact = {
  paths: [
    "*.password",
    "*.authorization",
    "req.headers.authorization",
    "req.headers.cookie",
    "user.token",
  ],
  remove: true,
};

export const logger = (level: string = "info", target: string = "pino-pretty") => {
  return pino({
    level: level,
    redact,
    transport: {
      target: target,
      options: {
        singleLine: true,
        translateTime: "SYS:yyyy-mm-dd HH:MM:ss.l",
        messageFormat:
          "{msg} {req.method} {req.url} {res.statusCode} {res.responseTime}ms",
        ignore: "pid,hostname",
      },
    },
  });
};
