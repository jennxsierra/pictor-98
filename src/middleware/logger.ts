import morgan from "morgan";
import chalk from "chalk";
import { Request } from "express";

// Token for request body (will be mostly empty for GET)
morgan.token("body", (req: Request) => JSON.stringify(req.body));

// Token for human-readable timestamp
morgan.token("timestamp", () => {
  const now = new Date();
  return now.toLocaleString();
});

// Token for color-coded HTTP method
morgan.token("methodColored", (req: Request) => {
  const method = req.method;
  switch (method) {
    case "GET":
      return chalk.green(method);
    case "POST":
      return chalk.blue(method);
    case "PATCH":
      return chalk.cyan(method);
    case "PUT":
      return chalk.yellow(method);
    case "DELETE":
      return chalk.red(method);
    default:
      return chalk.white(method);
  }
});

// Token for color-coded status code
morgan.token("statusColored", (_req, res) => {
  const status = res.statusCode;
  if (status >= 500) return chalk.red(status.toString());
  if (status >= 400) return chalk.red(status.toString());
  if (status >= 300) return chalk.cyan(status.toString());
  if (status >= 200) return chalk.green(status.toString());
  return chalk.white(status.toString());
});

const customFormat = [
  chalk.gray("[:timestamp]"),
  ":methodColored",
  ":url",
  ":statusColored",
  chalk.yellow(":response-time ms"),
].join(" ");

const logger = morgan(customFormat, {
  skip: (req: Request) => {
    // Skip logging requests for static assets
    const skipExtensions = [".css", ".png", ".jpg", ".jpeg", ".gif", ".svg"];
    return skipExtensions.some((ext) => req.url.endsWith(ext));
  },
});

export default logger;
