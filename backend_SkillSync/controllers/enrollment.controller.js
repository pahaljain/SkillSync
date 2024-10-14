import Enrollment from "../models/enrollment.model.js";

// Enroll an employee in a course
export const enrollEmployee = async (req, res) => {
  try {
    const { employee_id, course_id } = req.body;
    const enrollment = new Enrollment({ employee_id, course_id });
    await enrollment.save();
    res.status(201).json({ message: "Enrollment successful", enrollment });
  } catch (error) {
    res.status(500).json({ message: "Error enrolling employee", error });
  }
};

// Get all enrollments
export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("employee_id")
      .populate("course_id");
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get specific enrollment by ID
export const getEnrollmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const enrollment = await Enrollment.findById(id)
      .populate("employee_id")
      .populate("course_id");
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEnrollmentByEmployeeAndCourse = async (req, res) => {
  const { employee_id, course_id } = req.params;

  try {
    const enrollment = await Enrollment.findOne({
      employee_id: employee_id,
      course_id: course_id,
    });

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res.json({ enrollment_id: enrollment._id }); // Send back the enrollment ID
  } catch (error) {
    console.error("Error fetching enrollment:", error);
    res.status(500).json({ message: error.message });
  }
};