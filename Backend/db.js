import mongoose from "mongoose";


export const connectDB = async(uri) => {
  try {

    const con = await mongoose.connect(uri)
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};