import mongoose from "mongoose";

// Schema for feedback categories
const feedbackSchema = new mongoose.Schema({
  punctuality: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
    default: 3,
  },
  hardworking: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
    default: 3,
  },
  assignment_ontime: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
    default: 3,
  },
  communication_skills: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
    default: 3,
  }
});

// Schema for overall performance score
const performanceSchema = new mongoose.Schema({
  enrollment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enrollment",
    required: true,
  },
  feedback: feedbackSchema, // Embedding the feedback schema
  overall_score: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
});

const Performance = mongoose.model("Performance", performanceSchema);
export default Performance;
