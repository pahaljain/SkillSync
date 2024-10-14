import express from "express";
import { addEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee } from "../controllers/employee.controller.js";

const router = express.Router();

// Route to get all employees
router.get("/", getAllEmployees);

// // Route to add a new employee
router.post("/", addEmployee);

// // Route to get a specific employee by ID
// router.get("/employees/:id", getEmployeeById);

// // Route to update an employee by ID
// router.put("/employees/:id", updateEmployee);

// Route to delete an employee by ID
router.delete("/:id", deleteEmployee);

export default router;
