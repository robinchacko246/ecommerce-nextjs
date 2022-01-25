import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true },
    no: { type:   Number, required: true, unique: true },
   
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
export default Category;
