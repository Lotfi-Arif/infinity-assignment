import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        deadline: {
            type: Date,
            default: null
        },
        completedAt: {
            type: Date,
            default: null
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        startDate: {
            type: Date,
            default: null
        }
    });

export default mongoose.model('Task', taskSchema);