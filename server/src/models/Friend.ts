import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const friendSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'You must add your friend\s first name']
    },
    lastname: {
        type: String,
        required: [true, 'You must add your friend\'s last name']
    }
});

const Friend = model('Friend', friendSchema);

export default Friend;