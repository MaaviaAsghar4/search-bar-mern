
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const carSchema = new mongoose.Schema({
    car_ID: { type: Number, required: true },
    CarName: { type: String, required: true },
    price: { type: Number, required: true },
    _id: { type: ObjectId, auto: true },
});


const Cars = mongoose.model("Cars", carSchema);

export default Cars;