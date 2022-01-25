import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const lectureSchema = new mongoose.Schema(
  {
    no:{
      type: Number,
      required: false
  },
  title: {
      type: String,
      required: true
  },
  slug: {
    type: String,
    required: true
},
  image:{
      type: String,
      required: false
  },
  videoLink: {
      type: String,
      required: true
  },
  course : { type: Schema.Types.ObjectId, ref: 'Course' }
   
  },
  {
    timestamps: true,
  }
);

const Lecture = mongoose.models.Lecture || mongoose.model('Lecture', lectureSchema);
export default Lecture;
