import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
import User from '../models/User.js';
const { sign } = jwt;
function createToken(user_id) {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return sign({ user_id: user_id }, process.env.JWT_SECRET);
}
const resolvers = {
    Query: {
        test() {
            return 'test string';
        }
    },
    Mutation: {
        //Register a user 
        async registerUser(_, args, context) {
            try {
                const user = await User.create(args);
                // create a cookie 
                const token = createToken(user._id);
                // send the cookie, make it secure with these settings 
                context.res.cookie('pet_token', token, {
                    httpOnly: true,
                    secure: process.env.PORT ? true : false,
                    sameSite: true
                });
                return { user, errors: [] };
            }
            catch (error) {
                const errors = [];
                if (error.code === 11000) {
                    errors.push('That email address is already in use');
                }
                else {
                    for (const prop in error.errors) {
                        errors.push(error.errors[prop].message);
                    }
                }
                return {
                    user: null,
                    errors: errors
                };
            }
        },
        // Log a user in
        loginUser() {
            return 'some string';
        }
    }
};
export default resolvers;
