import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    await connect("mongodb+srv://kundansingh023230:uxT1179dFsYWvv3k@cluster0.5q6trw3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;