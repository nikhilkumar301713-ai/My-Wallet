import mongoose from "mongoose";

const connectDb = async () => {
  try {
    console.log(process.env.MONGODB_URL);
    await mongoose.connect(process.env.MONGODB_URL, {
      family: 4, // forces IPv4 DNS resolution — fixes SRV lookup failures on some Windows setups
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDb;
