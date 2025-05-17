import mongoose from 'mongoose';

const disputeSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  course: { type: String, required: true },
  date: { type: String, required: true },
  reason: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  submittedAt: { type: Date, default: Date.now },
  userId: { type: String, required: true },
});


export default mongoose.model('Dispute', disputeSchema);
