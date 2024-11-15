import {Schema, model} from 'mongoose';
//const { Schema, model } = mongoose;

interface IUser extends Document {
    username: string,
    email: string,
    thoughts: Schema.Types.ObjectId[],
    friends: Schema.Types.ObjectId[]
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minLength: [2, 'Your username must be at least 2 characters in length']
    },
    email: {
        type: String,
        // The unique rule only works when the collection is first created
        // YOu cannot create a custom error message with the array witht the syntax on the unique rule
        unique: true,
        required: true,
        // Ensure the value is a valid email string
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
}, {
    toJSON: {
        transform(_, user) {
            delete user.__v;
            return user;
        }
    }
});

userSchema.virtual('friendCount').get(function() {
    return this.friends.length; // Get the amount of friends that the user has
})

const User = model('User', userSchema);
export default User;
