import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';
// const { hash, compare } = bcrypt;
const { Schema, model } = mongoose;



const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Ensure the value is a valid email string
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }]
}, {
    toJSON: {
        transform(_, user) {
            delete user.password;
            delete user.__v;
            return user
        }
    }
}
);



userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});


// -------------------------------------------------------------
// SOME CODE FOR EVENTUALLY IMPLEMENTING A LOGIN PASSWORD SYSTEM  
// -------------------------------------------------------------

// userSchema.pre('save', async function (next) {
//     const user: any = this;
//     if (user.isNew) {
//         user.password = await hash(user.password, 10)
//     }
//     next();
// });


// userSchema.methods.validatePassword = async function (formPassword: string) {
//     return await compare(formPassword, this.password)
// }

// -------------------------------------------------------------
// -------------------------------------------------------------



const User = model('User', userSchema);



export default User;