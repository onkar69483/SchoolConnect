import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter the notice title"],
        },
        notice: {
            type: String,
            required: [true, "Please enter the notice content"],
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        date: {
            type: Date,
            required: [true, "Please enter the date of the event"],
        },
        time: {
            type: String,
            required: [true, "Please enter the time of the event"],
        },
    },
    { timestamps: true }
);

export const Notice = mongoose.model("Notice", noticeSchema);
