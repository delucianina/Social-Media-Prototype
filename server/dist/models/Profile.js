import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const profileSchema = new Schema({
    username: {
        type: String,
        minLength: [2, 'Your username must be at least 2 characters in length']
    },
    age: {
        type: Number,
        required: [true, 'You must provide your age']
    },
    thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }]
});
const Profile = model('Profile', profileSchema);
export default Profile;
