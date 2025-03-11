import { Schema, model } from "mongoose";

const webSeriesSchema = new Schema({
    name: { type: String, required: true },
    channel: { type: String, required: true },
    episodes: { type: Number, required: true },
    genre: { 
        type: [String], 
        required: true, 
        enum: ['comedy', 'drama', 'thriller', 'romance', 'romantic comedy', 'family'] 
    },
    rating: { type: Number, required: true, min: 0, max: 10 },
    link: { type: String, required: true },
    description: { type: String, required: true },
    cast: [{
        actor: { type: String, required: true }
    }],
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        text: String,
        date: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

export const WebSeries = model('WebSeries', webSeriesSchema);
