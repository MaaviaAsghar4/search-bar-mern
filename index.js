import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import Cars from "./model.js"
import cors from "cors";

config();

const server = express();
const PORT = process.env.PORT || 5000;

server.use(cors())

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/carvaluation', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("connected to database"))
    .catch((err) => console.log(err.message))

server.get("/", (req, res) => {
    res.status(200).json({ "msg": "server running" })
})

server.get("/carlist", async (req, res) => {
    try {
        const query = req.query?.carname;
        if (!query) {
            return res.status(200).json({ "cars": [] })
        }
        const regexp = new RegExp(`^${query}`, 'g')
        const cars = await Cars.find({ CarName: { $regex:  regexp } }).limit(7)
        res.status(200).json({ "cars": cars })
    } catch (error) {
        res.status(400).json({ "msg": "cars not found" })
    }
})

// Start the API server
server.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(
        `Server is listening at: ${PORT}`
    );
});