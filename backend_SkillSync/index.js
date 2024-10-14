import "dotenv/config.js";
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";

// Importing the routes
import userRouter from "./routes/user.routes.js";
import employeeRouter from "./routes/employee.routes.js";
import courseRouter from "./routes/course.routes.js";
import enrollmentRouter from "./routes/enrollment.routes.js";
import performanceRouter from "./routes/performance.routes.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/courses", courseRouter);
app.use("/api/enrollments", enrollmentRouter);
app.use("/api/performance", performanceRouter);

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
