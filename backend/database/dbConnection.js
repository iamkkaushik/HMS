// import mongoose from "mongoose";

// export const dbConnection = () => {
//   mongoose
//     .connect(process.env.MONGO_URI, {
//       dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM",
//     })
//     .then(() => {
//       console.log("Connected to database!");
//     })
//     .catch((err) => {
//       console.log("Some error occured while connecting to database:", err);
//     });
// };



// const mongoose = require('mongoose');

// const mongoURI = "mongodb+srv://kaushikkodarapu10:LOkxw0GNlhB3TNWj@cluster1.gjdudq3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
//LOkxw0GNlhB3TNWj


// Connect to the database first
import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
    }
};


