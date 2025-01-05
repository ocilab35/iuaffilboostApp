import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  approved: { type: Boolean, default: false }, // Approval status
  role: { type: String, default: 'user' },
});

const Admin = mongoose.model('Admin', UserSchema);
export default Admin;
