import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;
// FUNCTION TO GET CURRENT DATE
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed 
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // "2024-11-15 12:34:56"
}
// REACTION SCHEMA
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: [280, 'Your reaction text should be 280 characters or less']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => formatTimestamp(date)
    }
}, {
    toJSON: {
        getters: true
    },
    id: false,
});
// THOUGHT SCHEMA
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: [1, 'Your thought must be at least 1 character in length'],
        maxLength: [280, 'Your thought cannot exceed 280 characters in length']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => formatTimestamp(date)
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    toObject: {
        virtuals: true
    }
});
// VIRTUAL TO GET REACTION COUNT
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
// pass in model method: give name we want to call it, then the schema 
const Thought = model('Thought', thoughtSchema);
// export it 
export default Thought;
