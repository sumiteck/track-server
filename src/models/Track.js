const mongoose = require("mongoose");

const pointSchema =new mongoose.Schema({
    timestamp: Number,
    coords: {
        Latitude: Number,
        longitude: Number,
        altitude: Number,
        accuracy: Number,
        heading: Number,
        speed: Number
    }
})

const trackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    },
    name: {
        type: String,
        default: ""
    },
    lacations: [pointSchema]
});

mongoose.model("Track, trackSchema");