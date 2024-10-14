import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  trainer: {
    trainer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    trainer_name: {
      type: mongoose.Schema.Types.String,
      ref: "User",
      required: true,
    },
  },
  employees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",  // Reference to the Employee model
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
