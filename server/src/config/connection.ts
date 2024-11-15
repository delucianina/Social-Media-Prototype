import mongoose from 'mongoose';

const connection = async (): Promise<typeof mongoose.connection> => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/social_network_db');
        return mongoose.connection;
    } catch (err) {
        console.error('Error connecting to DB', err);
        throw new Error('Connection Failed');
    }
}
export default connection;
