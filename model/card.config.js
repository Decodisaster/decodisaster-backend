import mongoose from "mongoose";
import bcrypt  from 'bcryptjs';
import connectDB from "../config/db.config.js";
connectDB()
// Define the schema
const cardSchema = new mongoose.Schema({
    card_number: {
        type: Number,
        required: [true, 'this is required value'],
        unique: true
    },
    points: Number,
    instruction: String,
    noofquestions: Number,
});
// Define the model
const Card = mongoose.model("Card", cardSchema);

export default Card;
