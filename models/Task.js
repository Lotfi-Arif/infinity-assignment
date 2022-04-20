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
          ref: 'User',
          required: [true, 'Please provide user'],
        },
    });

export default mongoose.model('Task', taskSchema);