import express from "express";
import exampleRoutes from "./routes/exampleRoutes";
import taskRoutes from "./routes/task.route";
import setupSwagger from "./swagger";
import dotenv from "dotenv";
import statusMonitor from "express-status-monitor";

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

// Setup Swagger
setupSwagger(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running in ${env} mode on port ${PORT}`);
  console.log(`Swagger host: ${process.env.SWAGGER_HOST}-docs/`);
});
