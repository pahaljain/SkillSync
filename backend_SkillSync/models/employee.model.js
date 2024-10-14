import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    index: true,
    lowercase: true,
    required: true,
    unique: true,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
