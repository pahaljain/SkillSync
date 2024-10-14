import Employee from "../models/employee.model.js";

// Add a new employee
export const addEmployee = async (req, res) => {
  const { name, email } = req.body;

  try {
    const newEmployee = new Employee({
      name,
      email,
    });

    await newEmployee.save();
    res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all employees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({}, 'name email'); // Adjust fields as needed
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific employee by ID
export const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update employee details
export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const employee = await Employee.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an employee
export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
