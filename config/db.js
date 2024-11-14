import mongoose from "mongoose";

try {
  await mongoose.connect("mongodb://root:root@127.0.0.1:27017/Ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log("Database Connected Successfully");
} catch (err) {
  console.log("Database Not Connected");
}