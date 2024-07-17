import express, {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";
import exampleRoutes from "./routes/exampleRoutes";
import taskRoutes from "./routes/task.route";
import setupSwagger from "./swagger";
import dotenv from "dotenv";
import statusMonitor from "express-status-monitor";
import indexRouter from "./routes/index.route";
import categoryRoutes from "./routes/category.route";

// Load environment variables from the appropriate .env file
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup express-status-monitor
const monitor = statusMonitor();
app.use(monitor);

// Routes
app.use("/api/example", exampleRoutes);
app.use("/api", taskRoutes);
app.use("/", indexRouter);
app.use("/api", categoryRoutes);

// Setup Swagger
setupSwagger(app);

// Simple alert system
let requestCount = 0;
let errorCount = 0;

// Middleware to count requests
app.use((req, res, next) => {
  requestCount++;
  next();
});

// Middleware to count errors
app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    errorCount++;
    next(err);
  }
);

// Set an interval to check request and error counts every minute
setInterval(() => {
  if (requestCount > 100) {
    console.log(
      `High request rate alert: ${requestCount} requests in the last minute.`
    );
  }
  if (errorCount > 10) {
    console.log(
      `High error rate alert: ${errorCount} errors in the last minute.`
    );
  }
  requestCount = 0;
  errorCount = 0;
}, 60000);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running in ${env} mode on port ${PORT}`);
  console.log(`Swagger host: ${process.env.SWAGGER_HOST}-docs/`);
});
