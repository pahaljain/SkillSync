import Enrollment from "../models/enrollment.model.js";
import Performance from "../models/performance.model.js";

// Assign performance scores to an employee
export const assignScore = async (req, res) => {
  const { enrollment_id, feedback, overall_score } = req.body;

  try {
    const enrollment = await Enrollment.findById(enrollment_id);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    // Ensure overall score is between 0 and 10
    if (overall_score < 0 || overall_score > 10) {
      return res
        .status(400)
        .json({ message: "Overall score must be between 0 and 10" });
    }

    // Create new performance record
    const performance = new Performance({
      enrollment_id,
      feedback, // feedback will automatically be validated by the schema
      overall_score,
    });

    // Save performance and link to enrollment
    await performance.save();

    // Update the enrollment to reference this performance
    enrollment.feedback = performance._id;
    await enrollment.save();

    res.status(200).json({ message: "Score assigned successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch performance for all employees in a course
export const getPerformanceByCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const enrollments = await Enrollment.find({ course_id: courseId })
      .populate("employee_id", "name email") // Fetch only necessary fields
      .populate("feedback");

    const performanceData = enrollments.map((enrollment) => ({
      employee: enrollment.employee_id, // Send employee details directly
      feedback: enrollment.feedback ? enrollment.feedback.feedback : null,
      overall_score: enrollment.feedback
        ? enrollment.feedback.overall_score
        : null,
    }));

    res.status(200).json(performanceData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch performance for a specific employee in a specific course
export const getPerformanceByEmployee = async (req, res) => {
  const { employeeId, courseId } = req.params;

  try {
    const enrollment = await Enrollment.findOne({
      employee_id: employeeId,
      course_id: courseId,
    })
      .populate("course_id", "title") // Populate course details
      .populate("feedback"); // Populate feedback if available

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    const performanceData = {
      employee: {
        _id: enrollment.employee_id,
        // Fetch employee details if needed
      },
      feedback: enrollment.feedback ? enrollment.feedback.feedback : null,
      overall_score: enrollment.feedback
        ? enrollment.feedback.overall_score
        : null,
    };

    res.status(200).json(performanceData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Fetch performance for all employees across all courses
export const getAllPerformances = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("employee_id", "name email") // Fetch only necessary employee fields
      .populate("course_id", "title") // Fetch course title
      .populate("feedback"); // Fetch feedback related to performance

    const performanceData = enrollments.map((enrollment) => ({
      employee: enrollment.employee_id, // Employee details
      course: enrollment.course_id, // Course details
      feedback: enrollment.feedback ? enrollment.feedback.feedback : null, // Feedback categories
      overall_score: enrollment.feedback
        ? enrollment.feedback.overall_score
        : null, // Overall score
    }));

    res.status(200).json(performanceData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
