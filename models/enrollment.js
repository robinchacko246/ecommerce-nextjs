import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const EnrollmentSchema = new mongoose.Schema(
  {
    no: {
      type: Number,
      default: 1,
      required: false
    },
    student: { type: Schema.Types.ObjectId, ref: "User" },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    approved: {
      type: Boolean,
      default: true,
      required: false
    },
  },
  {
    timestamps: true,
  }
)
const Enrollments = mongoose.models.Enrollments || mongoose.model('Enrollments', EnrollmentSchema);
export default Enrollments;
