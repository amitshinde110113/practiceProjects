const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const useraSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdEvents: [{
        type: Schema.Types.ObjectId,
        ref: "Event"
    }]
})

module.exports = mongoose.model('EventUser', useraSchema)