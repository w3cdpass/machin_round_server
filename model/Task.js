const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, requried: true },
    desc: { type: String, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: Boolean, default: false }
}, { timestamps: true, strict: false });

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;