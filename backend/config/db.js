import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://achieveraditya2_db_user:1KVHlDbPqMzRapVM@cluster0.ptxh2fc.mongodb.net/RealState")
.then(() => {
    console.log("DB Connected");
})
}