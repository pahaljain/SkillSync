// routes.js
import express from "express";
import {
  assignScore,
  getPerformanceByCourse,
  getPerformanceByEmployee,
  getAllPerformances,
} from "../controllers/performance.controller.js";

const router = express.Router();

// Route to get all performances
router.get("/", getAllPerformances);

// Route to assign performance scores to an employee for a specific course
router.post("/assign-score", assignScore);

// Route to get performance for a specific course
router.get("/:courseId", getPerformanceByCourse);

// Route to get performance for a specific employee in a specific course
router.get("/get/:employeeId/:courseId", getPerformanceByEmployee);

export default router;
