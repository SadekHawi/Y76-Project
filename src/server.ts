import express from "express";
import exampleRoutes from "./routes/exampleRoutes";
import taskRoutes from "./routes/task.route";
import setupSwagger from "./swagger";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/example", exampleRoutes);
app.use("/api", taskRoutes);

// Setup Swagger
setupSwagger(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
