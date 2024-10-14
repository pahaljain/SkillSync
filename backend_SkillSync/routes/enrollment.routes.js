import express from "express";
import {
  enrollEmployee,
  getAllEnrollments,
  getEnrollmentById,
  getEnrollmentByEmployeeAndCourse,
} from "../controllers/enrollment.controller.js";

const router = express.Router();

// Route to enroll an employee in a course
router.post("/", enrollEmployee);

// Route to get all enrollments
router.get("/", getAllEnrollments);

// Route to get a specific enrollment by ID
router.get("/:id", getEnrollmentById);

// Route to get enrollment by employee and course
router.get("/:employee_id/:course_id", getEnrollmentByEmployeeAndCourse);

// Additional routes as needed
export default router;
