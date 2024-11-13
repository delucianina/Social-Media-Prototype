import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const likeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
const thoughtSchema = new Schema({
    title: {
        type: String,
        minLength: [3, 'Your title must be at least 3 characters in length']
    },
    body: {
        type: String,
        minLength: [3, 'Your post body must be at least 3 characters in length']
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'You must attach the user _id to the post'],
        ref: 'User'
    },
    likes: [likeSchema]
});
// pass in model method: give name we want to call it, then the schema 
const Thought = model('Thought', thoughtSchema);
// export it 
export default Thought;
