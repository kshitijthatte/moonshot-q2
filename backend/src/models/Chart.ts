import mongoose from 'mongoose';

const ChartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filters: {
    startDate: Date,
    endDate: Date,
    age: String,
    gender: String,
    feature: String,
  },
});

export default mongoose.model('Chart', ChartSchema);
